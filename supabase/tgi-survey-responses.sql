create table if not exists public.tgi_survey_responses (
  id bigint primary key,
  respondent_name text,
  community text,
  organization text default 'TGI',
  overall_score numeric default 0,
  awareness_score numeric default 0,
  participation_score numeric default 0,
  behavior_score numeric default 0,
  csr_focus text,
  suggestion text,
  raw_data jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.tgi_survey_responses enable row level security;

drop policy if exists "Admin can manage TGI survey responses" on public.tgi_survey_responses;
drop policy if exists "Anyone can submit TGI survey responses" on public.tgi_survey_responses;
drop policy if exists "TGI report viewers can read survey responses" on public.tgi_survey_responses;

create policy "Anyone can submit TGI survey responses"
on public.tgi_survey_responses
for insert
with check (true);

create policy "TGI report viewers can read survey responses"
on public.tgi_survey_responses
for select
using (
  coalesce(auth.jwt() -> 'app_metadata' ->> 'role', auth.jwt() -> 'user_metadata' ->> 'role', '') in ('admin', 'super_admin', 'tgi_report_viewer')
  or lower(auth.jwt() ->> 'email') in ('admin@verdixgreen.com', 'khomsans@gmail.com', 'kowit007@gmail.com', 'witchayakul.tw@gmail.com')
  or exists (
    select 1
    from public.user_roles ur
    where lower(ur.email) = lower(auth.jwt() ->> 'email')
      and ur.status = 'active'
      and ur.role in ('admin', 'super_admin', 'tgi_report_viewer')
  )
);

create policy "Admin can manage TGI survey responses"
on public.tgi_survey_responses
for all
using (
  coalesce(auth.jwt() -> 'app_metadata' ->> 'role', auth.jwt() -> 'user_metadata' ->> 'role', '') in ('admin', 'super_admin')
  or lower(auth.jwt() ->> 'email') in ('admin@verdixgreen.com', 'khomsans@gmail.com', 'kowit007@gmail.com')
)
with check (
  coalesce(auth.jwt() -> 'app_metadata' ->> 'role', auth.jwt() -> 'user_metadata' ->> 'role', '') in ('admin', 'super_admin')
  or lower(auth.jwt() ->> 'email') in ('admin@verdixgreen.com', 'khomsans@gmail.com', 'kowit007@gmail.com')
);

create index if not exists tgi_survey_responses_created_at_idx
on public.tgi_survey_responses (created_at desc);

create index if not exists tgi_survey_responses_community_idx
on public.tgi_survey_responses (community);
