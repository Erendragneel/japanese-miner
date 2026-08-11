create table if not exists public.player_saves (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  email text not null default '',
  game_state jsonb not null default '{}'::jsonb,
  course_settings jsonb not null default '{}'::jsonb,
  revision bigint not null default 0,
  updated_at timestamptz not null default now(),
  admin_reset_at timestamptz,
  admin_reset_by uuid references auth.users(id) on delete set null,
  admin_reset_target text
);

alter table public.player_saves enable row level security;

revoke all on table public.player_saves from anon, authenticated;

create or replace function public.is_language_miner_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.app_admins where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_language_miner_admin() from public, anon;
grant execute on function public.is_language_miner_admin() to authenticated;

create or replace function public.load_player_save()
returns table (
  user_id uuid,
  display_name text,
  email text,
  game_state jsonb,
  course_settings jsonb,
  revision bigint,
  updated_at timestamptz,
  admin_reset_at timestamptz,
  admin_reset_target text
)
language sql
stable
security definer
set search_path = public
as $$
  select s.user_id, s.display_name, s.email, s.game_state, s.course_settings,
         s.revision, s.updated_at, s.admin_reset_at, s.admin_reset_target
  from public.player_saves s
  where s.user_id = (select auth.uid());
$$;

create or replace function public.save_player_state(
  p_game_state jsonb,
  p_course_settings jsonb,
  p_display_name text,
  p_email text,
  p_base_revision bigint
)
returns table (
  accepted boolean,
  user_id uuid,
  display_name text,
  email text,
  game_state jsonb,
  course_settings jsonb,
  revision bigint,
  updated_at timestamptz,
  admin_reset_at timestamptz,
  admin_reset_target text
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := (select auth.uid());
  v_verified_email text;
  v_existing public.player_saves%rowtype;
  v_saved public.player_saves%rowtype;
begin
  if v_user_id is null then raise exception 'Authentication required' using errcode = '42501'; end if;
  select users.email into v_verified_email from auth.users as users where users.id = v_user_id;

  select * into v_existing from public.player_saves where player_saves.user_id = v_user_id for update;
  if found and v_existing.revision <> greatest(coalesce(p_base_revision, 0), 0) then
    return query select false, v_existing.user_id, v_existing.display_name, v_existing.email,
      v_existing.game_state, v_existing.course_settings, v_existing.revision,
      v_existing.updated_at, v_existing.admin_reset_at, v_existing.admin_reset_target;
    return;
  end if;

  insert into public.player_saves as saves
    (user_id, display_name, email, game_state, course_settings, revision, updated_at)
  values
    (v_user_id, left(coalesce(p_display_name, ''), 80), left(coalesce(v_verified_email, ''), 320),
     coalesce(p_game_state, '{}'::jsonb), coalesce(p_course_settings, '{}'::jsonb), 1, now())
  on conflict (user_id) do update set
    display_name = excluded.display_name,
    email = excluded.email,
    game_state = excluded.game_state,
    course_settings = excluded.course_settings,
    revision = saves.revision + 1,
    updated_at = now()
  returning * into v_saved;

  return query select true, v_saved.user_id, v_saved.display_name, v_saved.email,
    v_saved.game_state, v_saved.course_settings, v_saved.revision,
    v_saved.updated_at, v_saved.admin_reset_at, v_saved.admin_reset_target;
end;
$$;

create or replace function public.admin_search_players(p_search text default '', p_limit integer default 50)
returns table (
  user_id uuid,
  display_name text,
  email text,
  revision bigint,
  updated_at timestamptz,
  admin_reset_at timestamptz,
  admin_reset_target text,
  player_level integer,
  current_language text
)
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  if not public.is_language_miner_admin() then raise exception 'Administrator access required' using errcode = '42501'; end if;
  return query
    select u.id,
      coalesce(nullif(s.display_name, ''), u.raw_user_meta_data ->> 'display_name', split_part(coalesce(u.email, ''), '@', 1), 'Player'),
      coalesce(nullif(s.email, ''), u.email, ''),
      coalesce(s.revision, 0), s.updated_at, s.admin_reset_at, s.admin_reset_target,
      greatest(1, coalesce((s.game_state ->> 'level')::integer, 1)),
      coalesce(nullif(s.course_settings ->> 'learning', ''), 'ja')
    from auth.users u
    left join public.player_saves s on s.user_id = u.id
    where u.id <> (select auth.uid())
      and (
        nullif(trim(coalesce(p_search, '')), '') is null
        or coalesce(u.email, '') ilike '%' || trim(p_search) || '%'
        or coalesce(s.display_name, '') ilike '%' || trim(p_search) || '%'
        or u.id::text ilike '%' || trim(p_search) || '%'
      )
    order by coalesce(s.updated_at, u.created_at) desc
    limit least(greatest(coalesce(p_limit, 50), 1), 100);
end;
$$;

create or replace function public.admin_get_player_save(p_user_id uuid)
returns table (
  user_id uuid,
  display_name text,
  email text,
  game_state jsonb,
  course_settings jsonb,
  revision bigint,
  updated_at timestamptz,
  admin_reset_at timestamptz,
  admin_reset_target text
)
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  if not public.is_language_miner_admin() then raise exception 'Administrator access required' using errcode = '42501'; end if;
  return query
    select u.id,
      coalesce(nullif(s.display_name, ''), u.raw_user_meta_data ->> 'display_name', split_part(coalesce(u.email, ''), '@', 1), 'Player'),
      coalesce(nullif(s.email, ''), u.email, ''),
      coalesce(s.game_state, '{}'::jsonb), coalesce(s.course_settings, '{}'::jsonb),
      coalesce(s.revision, 0), s.updated_at, s.admin_reset_at, s.admin_reset_target
    from auth.users u
    left join public.player_saves s on s.user_id = u.id
    where u.id = p_user_id and u.id <> (select auth.uid());
end;
$$;

create or replace function public.admin_update_player_save(
  p_user_id uuid,
  p_game_state jsonb,
  p_course_settings jsonb,
  p_target text,
  p_base_revision bigint
)
returns table (
  accepted boolean,
  user_id uuid,
  display_name text,
  email text,
  game_state jsonb,
  course_settings jsonb,
  revision bigint,
  updated_at timestamptz,
  admin_reset_at timestamptz,
  admin_reset_target text
)
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_admin_id uuid := (select auth.uid());
  v_existing public.player_saves%rowtype;
  v_saved public.player_saves%rowtype;
  v_user auth.users%rowtype;
begin
  if not public.is_language_miner_admin() then raise exception 'Administrator access required' using errcode = '42501'; end if;
  if p_user_id is null or p_user_id = v_admin_id then raise exception 'Select another player' using errcode = '22023'; end if;
  select * into v_user from auth.users where id = p_user_id;
  if not found then raise exception 'Player account not found' using errcode = 'P0002'; end if;

  select * into v_existing from public.player_saves where player_saves.user_id = p_user_id for update;
  if found and v_existing.revision <> greatest(coalesce(p_base_revision, 0), 0) then
    return query select false, v_existing.user_id, v_existing.display_name, v_existing.email,
      v_existing.game_state, v_existing.course_settings, v_existing.revision,
      v_existing.updated_at, v_existing.admin_reset_at, v_existing.admin_reset_target;
    return;
  end if;

  insert into public.player_saves as saves
    (user_id, display_name, email, game_state, course_settings, revision, updated_at,
     admin_reset_at, admin_reset_by, admin_reset_target)
  values
    (p_user_id,
     coalesce(v_user.raw_user_meta_data ->> 'display_name', split_part(coalesce(v_user.email, ''), '@', 1), 'Player'),
     coalesce(v_user.email, ''), coalesce(p_game_state, '{}'::jsonb),
     coalesce(p_course_settings, '{}'::jsonb), 1, now(), now(), v_admin_id, left(coalesce(p_target, 'selected'), 80))
  on conflict (user_id) do update set
    game_state = excluded.game_state,
    course_settings = excluded.course_settings,
    revision = saves.revision + 1,
    updated_at = now(),
    admin_reset_at = now(),
    admin_reset_by = v_admin_id,
    admin_reset_target = excluded.admin_reset_target
  returning * into v_saved;

  return query select true, v_saved.user_id, v_saved.display_name, v_saved.email,
    v_saved.game_state, v_saved.course_settings, v_saved.revision,
    v_saved.updated_at, v_saved.admin_reset_at, v_saved.admin_reset_target;
end;
$$;

revoke all on function public.load_player_save() from public, anon;
revoke all on function public.save_player_state(jsonb, jsonb, text, text, bigint) from public, anon;
revoke all on function public.admin_search_players(text, integer) from public, anon;
revoke all on function public.admin_get_player_save(uuid) from public, anon;
revoke all on function public.admin_update_player_save(uuid, jsonb, jsonb, text, bigint) from public, anon;

grant execute on function public.load_player_save() to authenticated;
grant execute on function public.save_player_state(jsonb, jsonb, text, text, bigint) to authenticated;
grant execute on function public.admin_search_players(text, integer) to authenticated;
grant execute on function public.admin_get_player_save(uuid) to authenticated;
grant execute on function public.admin_update_player_save(uuid, jsonb, jsonb, text, bigint) to authenticated;

comment on table public.player_saves is
  'Server-owned Language Miner cloud saves. Players can load/save only through authenticated RPCs; global search and reset RPCs verify app_admins.';
