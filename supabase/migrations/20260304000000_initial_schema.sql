-- ============================================================
-- FoodRetainAI – Initial Database Schema
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- ── 0. Extensions ────────────────────────────────────────────
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ── 1. profiles ──────────────────────────────────────────────
-- Stores app users (mirrors the client-side localAuth)
create table if not exists public.profiles (
  id            uuid primary key default uuid_generate_v4(),
  email         text not null unique,
  name          text not null default '',
  password_hash text not null default '',          -- bcrypt hash (set on sign-up)
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

comment on table public.profiles is
  'Application user accounts (local auth – no Supabase Auth required)';

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

-- ── 2. chat_sessions ──────────────────────────────────────────
-- One session = one chatbot conversation
create table if not exists public.chat_sessions (
  id         uuid primary key default uuid_generate_v4(),
  user_email text        not null,
  title      text        not null default 'New Chat',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.chat_sessions is
  'Each row is one chatbot conversation thread';

drop trigger if exists trg_sessions_updated_at on public.chat_sessions;
create trigger trg_sessions_updated_at
  before update on public.chat_sessions
  for each row execute procedure public.set_updated_at();

-- ── 3. chat_messages ──────────────────────────────────────────
-- Individual messages within a session
do $$ begin
  create type public.message_role as enum ('user', 'assistant');
exception when duplicate_object then null;
end $$;

create table if not exists public.chat_messages (
  id         uuid primary key default uuid_generate_v4(),
  session_id uuid        not null references public.chat_sessions(id) on delete cascade,
  role       public.message_role not null,
  content    text        not null,
  created_at timestamptz not null default now()
);

comment on table public.chat_messages is
  'Individual messages within a chat session';

create index if not exists idx_chat_messages_session
  on public.chat_messages(session_id, created_at);

-- ── 4. churn_predictions ──────────────────────────────────────
-- Stores every prediction run from the Predict Churn tab
do $$ begin
  create type public.churn_result as enum ('Active', 'Inactive');
exception when duplicate_object then null;
end $$;

create table if not exists public.churn_predictions (
  id               uuid primary key default uuid_generate_v4(),
  user_email       text        not null,

  -- Input features (matches PredictionForm)
  gender           text,
  age              text,
  city             text,
  order_frequency  int,
  price            numeric(10,2),
  loyalty_points   int,
  rating           numeric(3,1),
  delivery_status  text,
  payment_method   text,
  category         text,

  -- Output
  prediction       public.churn_result not null,
  confidence       numeric(5,2),          -- e.g. 87.50 means 87.5 %
  model_used       text default 'Random Forest',

  created_at       timestamptz not null default now()
);

comment on table public.churn_predictions is
  'Every churn prediction made through the dashboard';

create index if not exists idx_predictions_user
  on public.churn_predictions(user_email, created_at desc);

-- ── 5. Row-Level Security (RLS) ───────────────────────────────
-- Since the app uses local auth (not Supabase Auth), RLS is set
-- permissive for the anon role so the client can read/write using
-- the anon key.  Tighten when Supabase Auth is adopted.

alter table public.profiles           enable row level security;
alter table public.chat_sessions      enable row level security;
alter table public.chat_messages      enable row level security;
alter table public.churn_predictions  enable row level security;

-- Profiles: anon can insert (sign-up) and select by email
create policy "anon_select_profiles" on public.profiles
  for select to anon using (true);

create policy "anon_insert_profiles" on public.profiles
  for insert to anon with check (true);

create policy "anon_update_profiles" on public.profiles
  for update to anon using (true) with check (true);

-- Chat sessions: full access for anon
create policy "anon_all_sessions" on public.chat_sessions
  for all to anon using (true) with check (true);

-- Chat messages: full access for anon
create policy "anon_all_messages" on public.chat_messages
  for all to anon using (true) with check (true);

-- Predictions: full access for anon
create policy "anon_all_predictions" on public.churn_predictions
  for all to anon using (true) with check (true);

-- ── 6. Seed: example data (optional, safe to remove) ─────────
-- Uncomment below to insert a test user (password = 'demo1234')
-- insert into public.profiles (email, name, password_hash)
-- values ('demo@foodretain.ai', 'Demo User', crypt('demo1234', gen_salt('bf')));
