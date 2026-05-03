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

create policy "Public read articles" on public.articles for select using (true);
create policy "Public read experts" on public.experts for select using (true);
create policy "Public read slides" on public.slides for select using (true);
create policy "Public read menus" on public.menus for select using (true);
create policy "Public read footer" on public.footer_settings for select using (true);

-- Development policy: allows the current frontend anon key to write.
-- Replace this with authenticated admin-only policies before production.
create policy "Development write articles" on public.articles for all using (true) with check (true);
create policy "Development write experts" on public.experts for all using (true) with check (true);
create policy "Development write slides" on public.slides for all using (true) with check (true);
create policy "Development write menus" on public.menus for all using (true) with check (true);
create policy "Development write footer" on public.footer_settings for all using (true) with check (true);
