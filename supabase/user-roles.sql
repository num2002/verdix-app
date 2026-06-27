create table if not exists public.user_roles (
  id bigserial primary key,
  email text not null unique,
  full_name text default '',
  organization text default '',
  role text not null default 'standard_user' check (role in ('super_admin', 'admin', 'standard_user')),
  status text not null default 'active' check (status in ('active', 'disabled')),
  note text default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.user_roles enable row level security;

drop policy if exists "Users read own user role" on public.user_roles;
drop policy if exists "Admins manage user roles" on public.user_roles;

create policy "Users read own user role"
on public.user_roles
for select
using (lower(auth.jwt() ->> 'email') = lower(email));

create policy "Admins manage user roles"
on public.user_roles
for all
using (
  (auth.jwt() -> 'app_metadata' ->> 'role') in ('super_admin', 'admin')
  or lower(auth.jwt() ->> 'email') in ('admin@verdixgreen.com', 'khomsans@gmail.com')
)
with check (
  (auth.jwt() -> 'app_metadata' ->> 'role') in ('super_admin', 'admin')
  or lower(auth.jwt() ->> 'email') in ('admin@verdixgreen.com', 'khomsans@gmail.com')
);

create index if not exists user_roles_email_idx on public.user_roles (lower(email));
create index if not exists user_roles_role_idx on public.user_roles (role);

insert into public.user_roles (email, full_name, organization, role, status, note)
values
  ('khomsans@gmail.com', 'Khomsan Suksena', 'VerdiX Green', 'super_admin', 'active', 'Bootstrap super admin'),
  ('admin@verdixgreen.com', 'Admin VerdiX', 'VerdiX Green', 'super_admin', 'active', 'Bootstrap super admin'),
  ('kowit007@gmail.com', 'Kowit007', '', 'admin', 'active', 'Bootstrap admin')
on conflict (email) do update set
  full_name = excluded.full_name,
  organization = excluded.organization,
  role = excluded.role,
  status = excluded.status,
  note = excluded.note,
  updated_at = now();
