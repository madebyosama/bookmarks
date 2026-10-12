-- Bookmarks schema. Run once in the Supabase SQL editor (or `supabase db push`), then run seed.sql.

create table categories (
  slug text primary key,
  name text not null unique,
  description text not null default ''
);

create table bookmarks (
  slug text primary key,
  title text not null,
  link text not null,
  description text not null default '',
  tags text[] not null default '{}',
  thumbnail text,
  favicon text,
  category_slug text not null references categories (slug),
  verified boolean not null default true,
  featured_position int,   -- set = shown in the home hero, in this order
  pick_position int,       -- set = shown in "Featured" on home and in search
  created_at timestamptz not null default now()
);

-- ponytail: bookmark lists are slug arrays (ordered, easy to edit in the table editor) with no FK.
-- Unknown slugs are skipped when loading. Move to join tables if integrity starts to matter.
create table collections (
  slug text primary key,
  title text not null,
  description text not null default '',
  position int not null default 0,
  bookmark_slugs text[] not null default '{}'
);

create table posts (
  slug text primary key,
  title text not null,
  excerpt text not null default '',
  tag text not null default '',
  body text not null default '',  -- paragraphs separated by a blank line
  bookmark_slugs text[] not null default '{}',
  published_at timestamptz not null default now()
);

create table glossary_terms (
  slug text primary key,
  term text not null,
  definition text not null,
  bookmark_slugs text[] not null default '{}'
);

create table saves (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  bookmark_slug text not null references bookmarks (slug) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, bookmark_slug)
);

-- Content is public and read-only from the app; edit it in the Supabase dashboard.
alter table categories enable row level security;
alter table bookmarks enable row level security;
alter table collections enable row level security;
alter table posts enable row level security;
alter table glossary_terms enable row level security;
alter table saves enable row level security;

create policy "public read" on categories for select using (true);
create policy "public read" on bookmarks for select using (true);
create policy "public read" on collections for select using (true);
create policy "public read" on posts for select using (true);
create policy "public read" on glossary_terms for select using (true);

create policy "own saves: read" on saves for select to authenticated using (auth.uid() = user_id);
create policy "own saves: add" on saves for insert to authenticated with check (auth.uid() = user_id);
create policy "own saves: remove" on saves for delete to authenticated using (auth.uid() = user_id);
