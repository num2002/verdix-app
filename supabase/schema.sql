create table if not exists public.articles (
  id bigint primary key,
  title_th text,
  title_en text,
  excerpt_th text,
  excerpt_en text,
  category text,
  date text,
  author text,
  image text
);

create table if not exists public.documents (
  id bigint primary key,
  title_th text,
  title_en text,
  description_th text,
  description_en text,
  category text,
  file_url text,
  file_data_url text,
  file_name text,
  file_type text,
  file_size integer,
  version text,
  updated_at text,
  downloads integer default 0,
  active boolean default true
);

create table if not exists public.experts (
  id bigint primary key,
  name text,
  name_th text,
  title_th text,
  title_en text,
  expertise jsonb default '[]'::jsonb,
  location text,
  rating numeric,
  reviews integer,
  manday integer,
  avatar text
);

create table if not exists public.slides (
  id bigint primary key,
  title_th text,
  title_en text,
  kicker_th text,
  kicker_en text,
  subtitle_th text,
  subtitle_en text,
  primary_th text,
  primary_en text,
  primary_page text,
  secondary_th text,
  secondary_en text,
  secondary_page text,
  image text,
  active boolean default true
);

create table if not exists public.menus (
  id bigint primary key,
  label_th text,
  label_en text,
  page text,
  parent_id bigint,
  "order" integer default 0,
  active boolean default true
);

create table if not exists public.footer_settings (
  id text primary key,
  settings jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now()
);

create table if not exists public.cfo_assessments (
  id bigint primary key,
  user_email text not null,
  organization_name text,
  reporting_year text,
  form_data jsonb not null default '{}'::jsonb,
  result jsonb not null default '{}'::jsonb,
  status text not null default 'submitted',
  reviewer_email text,
  review_note text,
  reviewed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.articles enable row level security;
alter table public.documents enable row level security;
alter table public.experts enable row level security;
alter table public.slides enable row level security;
alter table public.menus enable row level security;
alter table public.footer_settings enable row level security;
alter table public.cfo_assessments enable row level security;

drop policy if exists "Public read articles" on public.articles;
drop policy if exists "Public read documents" on public.documents;
drop policy if exists "Public read experts" on public.experts;
drop policy if exists "Public read slides" on public.slides;
drop policy if exists "Public read menus" on public.menus;
drop policy if exists "Public read footer" on public.footer_settings;
drop policy if exists "Users read own CFO assessments" on public.cfo_assessments;
drop policy if exists "Users create own CFO assessments" on public.cfo_assessments;
drop policy if exists "Users update own draft CFO assessments" on public.cfo_assessments;
drop policy if exists "Admin read CFO assessments" on public.cfo_assessments;
drop policy if exists "Admin review CFO assessments" on public.cfo_assessments;

drop policy if exists "Development write articles" on public.articles;
drop policy if exists "Development write documents" on public.documents;
drop policy if exists "Development write experts" on public.experts;
drop policy if exists "Development write slides" on public.slides;
drop policy if exists "Development write menus" on public.menus;
drop policy if exists "Development write footer" on public.footer_settings;

drop policy if exists "Authenticated write articles" on public.articles;
drop policy if exists "Authenticated write documents" on public.documents;
drop policy if exists "Authenticated write experts" on public.experts;
drop policy if exists "Authenticated write slides" on public.slides;
drop policy if exists "Authenticated write menus" on public.menus;
drop policy if exists "Authenticated write footer" on public.footer_settings;
drop policy if exists "Admin write articles" on public.articles;
drop policy if exists "Admin write documents" on public.documents;
drop policy if exists "Admin write experts" on public.experts;
drop policy if exists "Admin write slides" on public.slides;
drop policy if exists "Admin write menus" on public.menus;
drop policy if exists "Admin write footer" on public.footer_settings;

create policy "Public read articles" on public.articles for select using (true);
create policy "Public read documents" on public.documents for select using (true);
create policy "Public read experts" on public.experts for select using (true);
create policy "Public read slides" on public.slides for select using (true);
create policy "Public read menus" on public.menus for select using (true);
create policy "Public read footer" on public.footer_settings for select using (true);

create policy "Users read own CFO assessments" on public.cfo_assessments
  for select using (auth.jwt() ->> 'email' = user_email);

create policy "Users create own CFO assessments" on public.cfo_assessments
  for insert with check (auth.jwt() ->> 'email' = user_email);

create policy "Users update own draft CFO assessments" on public.cfo_assessments
  for update using (auth.jwt() ->> 'email' = user_email and status in ('draft', 'needs_revision'))
  with check (auth.jwt() ->> 'email' = user_email);

create policy "Admin read CFO assessments" on public.cfo_assessments
  for select using (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');

create policy "Admin review CFO assessments" on public.cfo_assessments
  for update using (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
  with check (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');

-- Production write policy: public users can read, but only Supabase Auth
-- users with app_metadata.role = 'admin' can create, update, or delete CMS content.
create policy "Admin write articles" on public.articles
  for all using (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
  with check (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');

create policy "Admin write documents" on public.documents
  for all using (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
  with check (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');

create policy "Admin write experts" on public.experts
  for all using (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
  with check (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');

create policy "Admin write slides" on public.slides
  for all using (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
  with check (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');

create policy "Admin write menus" on public.menus
  for all using (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
  with check (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');

create policy "Admin write footer" on public.footer_settings
  for all using (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
  with check (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');
