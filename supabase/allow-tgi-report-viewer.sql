drop policy if exists "TGI report viewers can read survey responses" on public.tgi_survey_responses;

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
