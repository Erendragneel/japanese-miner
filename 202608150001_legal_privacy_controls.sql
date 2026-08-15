-- Language Miner legal-readiness controls: policy consent, age assurance,
-- authenticated privacy requests, and privacy-administrator workflows.

create table if not exists public.legal_consents (
  user_id uuid primary key references auth.users(id) on delete cascade,
  account_role text not null check (account_role in ('learner_13_plus','adult_guardian','educator')),
  age_assurance text not null check (age_assurance in ('13_or_older','adult')),
  terms_version text not null,
  privacy_version text not null,
  consented_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.privacy_requests (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  request_type text not null check (request_type in ('access','correction','deletion','objection','other')),
  details text not null check (char_length(details) between 10 and 1200),
  status text not null default 'received' check (status in ('received','in_review','completed','declined')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz,
  admin_note text not null default ''
);

create index if not exists privacy_requests_user_created_idx on public.privacy_requests (user_id, created_at desc);
create index if not exists privacy_requests_status_created_idx on public.privacy_requests (status, created_at);

alter table public.legal_consents enable row level security;
alter table public.privacy_requests enable row level security;
revoke all on table public.legal_consents from anon, authenticated;
revoke all on table public.privacy_requests from anon, authenticated;

create or replace function public.capture_language_miner_signup_consent()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_role text := new.raw_user_meta_data ->> 'account_role';
  v_age text := new.raw_user_meta_data ->> 'age_assurance';
  v_terms text := new.raw_user_meta_data ->> 'terms_version';
  v_privacy text := new.raw_user_meta_data ->> 'privacy_version';
  v_consented_at timestamptz;
begin
  if v_role not in ('learner_13_plus','adult_guardian','educator')
     or v_age not in ('13_or_older','adult')
     or nullif(v_terms,'') is null
     or nullif(v_privacy,'') is null then
    return new;
  end if;
  begin v_consented_at := (new.raw_user_meta_data ->> 'consented_at')::timestamptz;
  exception when others then v_consented_at := now(); end;
  insert into public.legal_consents (user_id,account_role,age_assurance,terms_version,privacy_version,consented_at,updated_at)
  values (new.id,v_role,v_age,left(v_terms,80),left(v_privacy,80),coalesce(v_consented_at,now()),now())
  on conflict (user_id) do update set
    account_role=excluded.account_role,age_assurance=excluded.age_assurance,
    terms_version=excluded.terms_version,privacy_version=excluded.privacy_version,
    consented_at=excluded.consented_at,updated_at=now();
  return new;
end;
$$;

drop trigger if exists language_miner_capture_signup_consent on auth.users;
create trigger language_miner_capture_signup_consent
after insert on auth.users for each row execute function public.capture_language_miner_signup_consent();

create or replace function public.record_legal_consent(
  p_account_role text,
  p_age_assurance text,
  p_terms_version text,
  p_privacy_version text
)
returns table (account_role text, age_assurance text, terms_version text, privacy_version text, consented_at timestamptz)
language plpgsql
security definer
set search_path = public
as $$
declare v_user_id uuid := (select auth.uid());
begin
  if v_user_id is null then raise exception 'Authentication required' using errcode='42501'; end if;
  if p_account_role not in ('learner_13_plus','adult_guardian','educator') then raise exception 'Invalid account role' using errcode='22023'; end if;
  if p_age_assurance not in ('13_or_older','adult') then raise exception 'Invalid age assurance' using errcode='22023'; end if;
  if nullif(trim(coalesce(p_terms_version,'')),'') is null or nullif(trim(coalesce(p_privacy_version,'')),'') is null then raise exception 'Policy versions are required' using errcode='22023'; end if;
  insert into public.legal_consents as consent (user_id,account_role,age_assurance,terms_version,privacy_version,consented_at,updated_at)
  values (v_user_id,p_account_role,p_age_assurance,left(p_terms_version,80),left(p_privacy_version,80),now(),now())
  on conflict (user_id) do update set account_role=excluded.account_role,age_assurance=excluded.age_assurance,terms_version=excluded.terms_version,privacy_version=excluded.privacy_version,consented_at=excluded.consented_at,updated_at=now();
  return query select c.account_role,c.age_assurance,c.terms_version,c.privacy_version,c.consented_at from public.legal_consents c where c.user_id=v_user_id;
end;
$$;

create or replace function public.create_privacy_request(p_request_type text, p_details text)
returns table (id bigint, request_type text, status text, created_at timestamptz)
language plpgsql
security definer
set search_path = public
as $$
declare v_user_id uuid := (select auth.uid()); v_row public.privacy_requests%rowtype;
begin
  if v_user_id is null then raise exception 'Authentication required' using errcode='42501'; end if;
  if p_request_type not in ('access','correction','deletion','objection','other') then raise exception 'Invalid privacy request type' using errcode='22023'; end if;
  if char_length(trim(coalesce(p_details,''))) not between 10 and 1200 then raise exception 'Privacy request details must contain 10 to 1200 characters' using errcode='22023'; end if;
  if exists (select 1 from public.privacy_requests r where r.user_id=v_user_id and r.created_at > now()-interval '1 minute') then raise exception 'Please wait one minute before submitting another request' using errcode='22023'; end if;
  insert into public.privacy_requests (user_id,request_type,details) values (v_user_id,p_request_type,trim(p_details)) returning * into v_row;
  return query select v_row.id,v_row.request_type,v_row.status,v_row.created_at;
end;
$$;

create or replace function public.list_my_privacy_requests()
returns table (id bigint, request_type text, details text, status text, created_at timestamptz, updated_at timestamptz, completed_at timestamptz)
language sql
stable
security definer
set search_path = public
as $$
  select r.id,r.request_type,r.details,r.status,r.created_at,r.updated_at,r.completed_at
  from public.privacy_requests r where r.user_id=(select auth.uid()) order by r.created_at desc;
$$;

create or replace function public.admin_list_privacy_requests(p_status text default '', p_limit integer default 100)
returns table (id bigint,user_id uuid,email text,display_name text,request_type text,details text,status text,created_at timestamptz,updated_at timestamptz,admin_note text)
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  if not public.is_language_miner_admin() then raise exception 'Administrator access required' using errcode='42501'; end if;
  return query select r.id,r.user_id,coalesce(u.email,''),coalesce(s.display_name,u.raw_user_meta_data->>'display_name','Player'),r.request_type,r.details,r.status,r.created_at,r.updated_at,r.admin_note
  from public.privacy_requests r join auth.users u on u.id=r.user_id left join public.player_saves s on s.user_id=r.user_id
  where nullif(trim(coalesce(p_status,'')),'') is null or r.status=p_status order by r.created_at asc limit least(greatest(coalesce(p_limit,100),1),250);
end;
$$;

create or replace function public.admin_update_privacy_request(p_id bigint,p_status text,p_admin_note text default '')
returns table (id bigint,status text,updated_at timestamptz,completed_at timestamptz)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_language_miner_admin() then raise exception 'Administrator access required' using errcode='42501'; end if;
  if p_status not in ('received','in_review','completed','declined') then raise exception 'Invalid status' using errcode='22023'; end if;
  update public.privacy_requests r set status=p_status,admin_note=left(coalesce(p_admin_note,''),1200),updated_at=now(),completed_at=case when p_status in ('completed','declined') then now() else null end where r.id=p_id;
  return query select r.id,r.status,r.updated_at,r.completed_at from public.privacy_requests r where r.id=p_id;
end;
$$;

revoke all on function public.record_legal_consent(text,text,text,text) from public,anon;
revoke all on function public.create_privacy_request(text,text) from public,anon;
revoke all on function public.list_my_privacy_requests() from public,anon;
revoke all on function public.admin_list_privacy_requests(text,integer) from public,anon;
revoke all on function public.admin_update_privacy_request(bigint,text,text) from public,anon;
grant execute on function public.record_legal_consent(text,text,text,text) to authenticated;
grant execute on function public.create_privacy_request(text,text) to authenticated;
grant execute on function public.list_my_privacy_requests() to authenticated;
grant execute on function public.admin_list_privacy_requests(text,integer) to authenticated;
grant execute on function public.admin_update_privacy_request(bigint,text,text) to authenticated;

comment on table public.legal_consents is 'Current Language Miner age assurance and policy-version acknowledgement. Exact birth dates are not collected.';
comment on table public.privacy_requests is 'Private authenticated account-data requests. Direct table access is denied; controlled RPCs enforce ownership and admin review.';
