-- Enable necessary extensions
create extension if not exists "pgcrypto";
create extension if not exists "moddatetime";

-- 1. PROFILES TABLE
-- Stores minimal user information linked to their auth account.
-- ID is strictly the auth.users.id (no random generation).
create table if not exists profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Automatic updated_at handling for profiles
drop trigger if exists handle_updated_at on profiles;
create trigger handle_updated_at before update on profiles
  for each row execute procedure moddatetime (updated_at);

-- RLS for profiles
alter table profiles enable row level security;

drop policy if exists "Public profiles are viewable by everyone." on profiles;
create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

drop policy if exists "Users can insert their own profile." on profiles;
create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

drop policy if exists "Users can update own profile." on profiles;
create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);


-- 2. CARDS TABLE
-- Stores the digital business cards.
-- Minimal columns: ID, User Link, Data Payload, Timestamps.
create table if not exists cards (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  slug text unique,
  data jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for faster lookups by user_id
create index if not exists cards_user_id_idx on cards(user_id);

-- Automatic updated_at handling for cards
drop trigger if exists handle_updated_at on cards;
create trigger handle_updated_at before update on cards
  for each row execute procedure moddatetime (updated_at);

-- RLS for cards
alter table cards enable row level security;

drop policy if exists "Cards are viewable by everyone." on cards;
create policy "Cards are viewable by everyone." on cards
  for select using (true);

drop policy if exists "Users can insert their own cards." on cards;
create policy "Users can insert their own cards." on cards
  for insert with check (auth.uid() = user_id);

drop policy if exists "Users can update own cards." on cards;
create policy "Users can update own cards." on cards
  for update using (auth.uid() = user_id);

drop policy if exists "Users can delete own cards." on cards;
create policy "Users can delete own cards." on cards
  for delete using (auth.uid() = user_id);


-- 3. USER MANAGEMENT TRIGGER
-- Automatically creates a profile entry when a new user signs up.
-- Strictly uses the auth.users.id.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id, 
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Re-create the trigger to ensure it's up to date
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
