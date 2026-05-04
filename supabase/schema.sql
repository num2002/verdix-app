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

alter table public.articles enable row level security;
alter table public.experts enable row level security;
alter table public.slides enable row level security;
alter table public.menus enable row level security;
alter table public.footer_settings enable row level security;

drop policy if exists "Public read articles" on public.articles;
drop policy if exists "Public read experts" on public.experts;
drop policy if exists "Public read slides" on public.slides;
drop policy if exists "Public read menus" on public.menus;
drop policy if exists "Public read footer" on public.footer_settings;

drop policy if exists "Development write articles" on public.articles;
drop policy if exists "Development write experts" on public.experts;
drop policy if exists "Development write slides" on public.slides;
drop policy if exists "Development write menus" on public.menus;
drop policy if exists "Development write footer" on public.footer_settings;

drop policy if exists "Authenticated write articles" on public.articles;
drop policy if exists "Authenticated write experts" on public.experts;
drop policy if exists "Authenticated write slides" on public.slides;
drop policy if exists "Authenticated write menus" on public.menus;
drop policy if exists "Authenticated write footer" on public.footer_settings;
drop policy if exists "Admin write articles" on public.articles;
drop policy if exists "Admin write experts" on public.experts;
drop policy if exists "Admin write slides" on public.slides;
drop policy if exists "Admin write menus" on public.menus;
drop policy if exists "Admin write footer" on public.footer_settings;

create policy "Public read articles" on public.articles for select using (true);
create policy "Public read experts" on public.experts for select using (true);
create policy "Public read slides" on public.slides for select using (true);
create policy "Public read menus" on public.menus for select using (true);
create policy "Public read footer" on public.footer_settings for select using (true);

-- Production write policy: public users can read, but only Supabase Auth
-- users with app_metadata.role = 'admin' can create, update, or delete CMS content.
create policy "Admin write articles" on public.articles
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
