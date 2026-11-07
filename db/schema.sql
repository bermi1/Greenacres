-- Green Acres Smart School System: database schema (PostgreSQL 14+)
-- Mirrors the tables in src/data/db.ts one to one.

create extension if not exists pgcrypto;

create table applications (
  id            uuid primary key default gen_random_uuid(),
  ref           text unique not null,                 -- GA-27-0148
  created_at    timestamptz not null default now(),
  student_name  text not null,
  student_dob   date,
  student_gender text,
  prev_school   text,
  level         text not null,                        -- Nursery, Primary, Form One ...
  mode          text not null,                        -- Boarding / Day
  parent_name   text not null,
  parent_relation text,
  parent_phone  text not null,
  parent_email  text,
  parent_address text,
  channel       text not null default 'SMS',
  consent       boolean not null,
  doc_birth     text, doc_report text, doc_photo text, -- storage keys
  pay_method    text,
  stage         smallint not null default 0 check (stage between 0 and 4) -- Applied..Enrolled
);
create index on applications (stage, created_at desc);

create table messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  campus text not null, topic text not null,
  name text not null, phone text, email text, body text not null,
  read boolean not null default false
);

create table subscribers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  contact text unique not null
);

create table alumni (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null, year text, level text, work text, phone text, email text not null
);

create table page_copy (
  page text not null, lang text not null check (lang in ('en','sw')),
  heading text not null, intro text not null, cta text not null,
  status text not null check (status in ('Published','Draft')),
  updated_at timestamptz not null default now(),
  primary key (page, lang)
);

create table post_status (
  slug text primary key,
  status text not null check (status in ('Published','Draft','Scheduled'))
);

create table staff_visibility (staff_key text primary key, on_website boolean not null);
create table media_alt (name text primary key, alt text not null);

create table sms_campaigns (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null, lang text, audience text, sent int not null, delivered int not null default 0
);

create table role_permissions (id smallint primary key default 1, grid jsonb not null);

create table audit_log (
  id bigserial primary key,
  at timestamptz not null default now(),
  who text not null, what text not null
);
