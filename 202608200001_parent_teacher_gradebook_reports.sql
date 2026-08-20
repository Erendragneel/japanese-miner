-- Refresh the learner-link RPCs and expose only the additional whitelisted
-- gradebook fields needed by the read-only Parent/Teacher Center.

create or replace function public.list_parent_teacher_links()
returns table (
  id uuid,
  adult_user_id uuid,
  student_user_id uuid,
  status text,
  requested_at timestamptz,
  responded_at timestamptz,
  adult_display_name text,
  student_display_name text,
  adult_email text,
  student_email text
)
language sql
stable
security definer
set search_path = public, auth
as $$
  select links.id, links.adult_user_id, links.student_user_id, links.status,
    links.requested_at, links.responded_at,
    coalesce(nullif(adult_save.display_name, ''), adult.raw_user_meta_data ->> 'display_name', split_part(coalesce(adult.email, ''), '@', 1), 'Parent or teacher'),
    coalesce(nullif(student_save.display_name, ''), student.raw_user_meta_data ->> 'display_name', split_part(coalesce(student.email, ''), '@', 1), 'Learner'),
    coalesce(adult.email, ''), coalesce(student.email, '')
  from public.parent_teacher_links as links
  join auth.users as adult on adult.id = links.adult_user_id
  join auth.users as student on student.id = links.student_user_id
  left join public.player_saves as adult_save on adult_save.user_id = adult.id
  left join public.player_saves as student_save on student_save.user_id = student.id
  where (select auth.uid()) in (links.adult_user_id, links.student_user_id)
  order by links.updated_at desc;
$$;

create or replace function public.load_linked_learner_progress(p_student_user_id uuid)
returns table (
  user_id uuid,
  display_name text,
  progress_state jsonb,
  progress_settings jsonb,
  revision bigint,
  updated_at timestamptz
)
language plpgsql
stable
security definer
set search_path = public, auth
as $$
declare
  v_state jsonb := '{}'::jsonb;
  v_settings jsonb := '{}'::jsonb;
  v_safe_srs jsonb := '{}'::jsonb;
  v_safe_jlpt_reviews jsonb := '{}'::jsonb;
  v_safe_placements jsonb := '{}'::jsonb;
  v_safe_progress jsonb := '{}'::jsonb;
  v_safe_assessments jsonb := '[]'::jsonb;
  v_user_id uuid;
  v_display_name text;
  v_revision bigint := 0;
  v_updated_at timestamptz;
begin
  if not exists (
    select 1 from public.parent_teacher_links as links
    where links.adult_user_id = (select auth.uid())
      and links.student_user_id = p_student_user_id
      and links.status = 'approved'
  ) then raise exception 'Approved learner access required' using errcode = '42501'; end if;

  select learner.id,
    coalesce(nullif(saves.display_name, ''), learner.raw_user_meta_data ->> 'display_name', split_part(coalesce(learner.email, ''), '@', 1), 'Learner'),
    coalesce(saves.game_state, '{}'::jsonb), coalesce(saves.course_settings, '{}'::jsonb),
    coalesce(saves.revision, 0), saves.updated_at
  into v_user_id, v_display_name, v_state, v_settings, v_revision, v_updated_at
  from auth.users as learner
  left join public.player_saves as saves on saves.user_id = learner.id
  where learner.id = p_student_user_id;
  if v_user_id is null then raise exception 'Learner account not found' using errcode = 'P0002'; end if;

  select coalesce(jsonb_object_agg(item.key, jsonb_build_object('dueAt', item.value -> 'dueAt')), '{}'::jsonb)
  into v_safe_srs
  from jsonb_each(case when jsonb_typeof(v_state #> '{v5,srs}') = 'object' then v_state #> '{v5,srs}' else '{}'::jsonb end) as item;

  select coalesce(jsonb_object_agg(item.key, jsonb_build_object(
    'passed', item.value -> 'passed', 'best', item.value -> 'best', 'lastScore', item.value -> 'lastScore',
    'attempts', item.value -> 'attempts', 'passedAt', item.value -> 'passedAt',
    'fastestAt', item.value -> 'fastestAt', 'fastestTimeMs', item.value -> 'fastestTimeMs'
  )), '{}'::jsonb)
  into v_safe_jlpt_reviews
  from jsonb_each(case when jsonb_typeof(v_state -> 'jlptReviewCheckpoints') = 'object' then v_state -> 'jlptReviewCheckpoints' else '{}'::jsonb end) as item;

  select coalesce(jsonb_agg(jsonb_build_object(
    'id', item.value -> 'id', 'group', item.value -> 'group', 'type', item.value -> 'type',
    'course', item.value -> 'course', 'level', item.value -> 'level', 'section', item.value -> 'section',
    'lessons', item.value -> 'lessons', 'difficulty', item.value -> 'difficulty', 'score', item.value -> 'score',
    'correct', item.value -> 'correct', 'total', item.value -> 'total', 'answered', item.value -> 'answered',
    'passed', item.value -> 'passed', 'completedAt', item.value -> 'completedAt',
    'durationMs', item.value -> 'durationMs', 'finishReason', item.value -> 'finishReason'
  )), '[]'::jsonb)
  into v_safe_assessments
  from jsonb_array_elements(case when jsonb_typeof(v_state #> '{learningReport,assessmentAttempts}') = 'array' then v_state #> '{learningReport,assessmentAttempts}' else '[]'::jsonb end) as item;

  select coalesce(jsonb_object_agg(item.key, jsonb_build_object(
    'score', item.value -> 'score', 'total', item.value -> 'total', 'completedAt', item.value -> 'completedAt',
    'elapsedTimeMs', item.value -> 'elapsedTimeMs', 'fastestTimeMs', item.value -> 'fastestTimeMs',
    'beginner', item.value -> 'beginner'
  )), '{}'::jsonb)
  into v_safe_placements
  from jsonb_each(case when jsonb_typeof(v_settings -> 'placements') = 'object' then v_settings -> 'placements' else '{}'::jsonb end) as item;

  select coalesce(jsonb_object_agg(item.key, jsonb_build_object(
    'selectedMine', item.value -> 'selectedMine', 'selectedSection', item.value -> 'selectedSection',
    'selectedLesson', item.value -> 'selectedLesson', 'mineXpByMine', item.value -> 'mineXpByMine',
    'courseMastery', item.value -> 'courseMastery', 'bossDefeatedByMine', item.value -> 'bossDefeatedByMine',
    'bossBestByMine', item.value -> 'bossBestByMine', 'bossFastestByMine', item.value -> 'bossFastestByMine',
    'reviewCheckpoints', item.value -> 'reviewCheckpoints', 'answered', item.value -> 'answered',
    'correct', item.value -> 'correct'
  )), '{}'::jsonb)
  into v_safe_progress
  from jsonb_each(case when jsonb_typeof(v_settings -> 'progress') = 'object' then v_settings -> 'progress' else '{}'::jsonb end) as item;

  return query select v_user_id, v_display_name,
    jsonb_build_object(
      'level', v_state -> 'level', 'analytics', v_state -> 'analytics',
      'studyDates', v_state -> 'studyDates', 'practiceDates', v_state -> 'practiceDates',
      'studyTimeByDate', v_state -> 'studyTimeByDate', 'bestStreak', v_state -> 'bestStreak',
      'practiceStreak', v_state -> 'practiceStreak', 'selectedStage', v_state -> 'selectedStage',
      'clearedStages', v_state -> 'clearedStages', 'stageXp', v_state -> 'stageXp',
      'placementUnlockedThrough', v_state -> 'placementUnlockedThrough', 'kanaStats', v_state -> 'kanaStats',
      'questionStats', v_state -> 'questionStats', 'n5AcademyMastery', v_state -> 'n5AcademyMastery',
      'kanaFamilyLevel', v_state -> 'kanaFamilyLevel', 'jlptVocabularyLevel', v_state -> 'jlptVocabularyLevel',
      'jlptSectionLevel', v_state -> 'jlptSectionLevel',
      'learningReport', jsonb_build_object('assessmentAttempts', v_safe_assessments),
      'placementResult', jsonb_build_object(
        'overall', v_state #> '{placementResult,overall}', 'score', v_state #> '{placementResult,score}',
        'total', v_state #> '{placementResult,total}', 'completedAt', v_state #> '{placementResult,completedAt}',
        'finishedAt', v_state #> '{placementResult,finishedAt}', 'date', v_state #> '{placementResult,date}',
        'elapsedTimeMs', v_state #> '{placementResult,elapsedTimeMs}', 'fastestTimeMs', v_state #> '{placementResult,fastestTimeMs}'
      ),
      'jlptReviewCheckpoints', v_safe_jlpt_reviews,
      'v5', jsonb_build_object('reviewed', v_state #> '{v5,reviewed}', 'srs', v_safe_srs, 'bossFastestTimes', v_state #> '{v5,bossFastestTimes}')
    ),
    jsonb_build_object(
      'known', v_settings -> 'known', 'learning', v_settings -> 'learning',
      'purposes', v_settings -> 'purposes', 'placements', v_safe_placements, 'progress', v_safe_progress
    ),
    v_revision, v_updated_at;
end;
$$;

revoke all on function public.list_parent_teacher_links() from public, anon;
revoke all on function public.load_linked_learner_progress(uuid) from public, anon;
grant execute on function public.list_parent_teacher_links() to authenticated;
grant execute on function public.load_linked_learner_progress(uuid) to authenticated;

-- PostgREST normally reloads automatically after a migration; this explicit
-- notification repairs the stale schema-cache condition shown by older builds.
notify pgrst, 'reload schema';
