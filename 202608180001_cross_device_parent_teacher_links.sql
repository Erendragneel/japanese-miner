create table if not exists public.parent_teacher_links (
  id uuid primary key default gen_random_uuid(),
  adult_user_id uuid not null references auth.users(id) on delete cascade,
  student_user_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'approved', 'declined')),
  requested_at timestamptz not null default now(),
  responded_at timestamptz,
  updated_at timestamptz not null default now(),
  constraint parent_teacher_links_different_accounts check (adult_user_id <> student_user_id),
  constraint parent_teacher_links_unique_pair unique (adult_user_id, student_user_id)
);

alter table public.parent_teacher_links enable row level security;
revoke all on table public.parent_teacher_links from public, anon, authenticated;

create or replace function public.request_student_link(p_student_email text)
returns table (
  id uuid,
  adult_user_id uuid,
  student_user_id uuid,
  status text,
  requested_at timestamptz,
  responded_at timestamptz
)
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_adult_id uuid := (select auth.uid());
  v_student_id uuid;
  v_link public.parent_teacher_links%rowtype;
begin
  if v_adult_id is null then raise exception 'Authentication required' using errcode = '42501'; end if;
  select users.id into v_student_id
  from auth.users as users
  where lower(users.email) = lower(trim(coalesce(p_student_email, '')))
  limit 1;
  if v_student_id is null then raise exception 'No learner account matches that exact email address' using errcode = 'P0002'; end if;
  if v_student_id = v_adult_id then raise exception 'Use a different learner account' using errcode = '22023'; end if;

  insert into public.parent_teacher_links as links
    (adult_user_id, student_user_id, status, requested_at, responded_at, updated_at)
  values (v_adult_id, v_student_id, 'pending', now(), null, now())
  on conflict (adult_user_id, student_user_id) do update set
    status = case when links.status = 'declined' then 'pending' else links.status end,
    requested_at = case when links.status = 'declined' then now() else links.requested_at end,
    responded_at = case when links.status = 'declined' then null else links.responded_at end,
    updated_at = now()
  returning * into v_link;

  return query select v_link.id, v_link.adult_user_id, v_link.student_user_id,
    v_link.status, v_link.requested_at, v_link.responded_at;
end;
$$;

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

create or replace function public.respond_student_link(p_link_id uuid, p_approve boolean)
returns table (id uuid, status text, responded_at timestamptz)
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_link public.parent_teacher_links%rowtype;
begin
  update public.parent_teacher_links as links
  set status = case when p_approve is true then 'approved' else 'declined' end,
      responded_at = now(), updated_at = now()
  where links.id = p_link_id
    and links.student_user_id = (select auth.uid())
    and links.status = 'pending'
  returning * into v_link;
  if v_link.id is null then raise exception 'Pending learner request not found' using errcode = 'P0002'; end if;
  return query select v_link.id, v_link.status, v_link.responded_at;
end;
$$;

create or replace function public.remove_parent_teacher_link(p_link_id uuid)
returns table (id uuid, removed boolean)
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_id uuid;
begin
  delete from public.parent_teacher_links as links
  where links.id = p_link_id
    and (select auth.uid()) in (links.adult_user_id, links.student_user_id)
  returning links.id into v_id;
  if v_id is null then raise exception 'Learner link not found' using errcode = 'P0002'; end if;
  return query select v_id, true;
end;
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
      'questionStats', v_state -> 'questionStats',
      'placementResult', jsonb_build_object(
        'score', v_state #> '{placementResult,score}', 'total', v_state #> '{placementResult,total}',
        'completedAt', v_state #> '{placementResult,completedAt}', 'finishedAt', v_state #> '{placementResult,finishedAt}',
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

revoke all on function public.request_student_link(text) from public, anon;
revoke all on function public.list_parent_teacher_links() from public, anon;
revoke all on function public.respond_student_link(uuid, boolean) from public, anon;
revoke all on function public.remove_parent_teacher_link(uuid) from public, anon;
revoke all on function public.load_linked_learner_progress(uuid) from public, anon;

grant execute on function public.request_student_link(text) to authenticated;
grant execute on function public.list_parent_teacher_links() to authenticated;
grant execute on function public.respond_student_link(uuid, boolean) to authenticated;
grant execute on function public.remove_parent_teacher_link(uuid) to authenticated;
grant execute on function public.load_linked_learner_progress(uuid) to authenticated;

comment on table public.parent_teacher_links is
  'Learner-approved read-only links. Progress is exposed only through a whitelisted authenticated RPC.';
