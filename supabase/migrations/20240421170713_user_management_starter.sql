CREATE TYPE us_state AS ENUM (
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
    'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
    'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
    'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
    'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
);

CREATE TYPE account_type_enum AS ENUM (
  'ADMIN', 'PATIENT', 'PHARMACIST'
);

create table profiles (
  id uuid references auth.users NOT NULL primary key,
  first_name text NOT NULL,
  last_name text NOT NULL,
  sex text NOT NULL,
  address1 text NOT NULL,
  address2 text,
  city text NOT NULL,
  state_enum us_state NOT NULL,
  zip_code text NOT NULL,
  driver_license_url text,
  avatar_url text,
  date_of_birth timestamp NOT NULL,
  is_test_user boolean DEFAULT false NOT NULL,
  created_at timestamp with time zone NOT NULL,
  updated_at timestamp with time zone NOT NULL
);
-- Create a table for public profiles
-- TODO create CRUD reusable fields

create view public.users as select id, email, role, email_confirmed_at, raw_user_meta_data, last_sign_in_at, created_at, updated_at, phone, is_sso_user, deleted_at from auth.users;
-- https://github.com/supabase/auth-js/issues/359#issuecomment-1543297712
revoke all on public.users from anon;

create view user_profiles as
  SELECT
   profiles.*,
   auth.users.email
   FROM profiles JOIN auth.users ON auth.users.id = profiles.id 
   WHERE auth.users.id IS NOT NULL;


create table transfer_requests (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    pharmacy_name text,
    pharmacy_email text,
    pharmacy_phone_number text,
    updated_at timestamp with time zone,
    created_at timestamp with time zone,
    user_id uuid references auth.users not null
);

create table prescription_transfers (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    drug_name text not null,
    rx_name text not null,
    refill_date timestamp with time zone,
    pharmacist_first_name text not null,
    pharmacist_last_name text not null,
    pharmacist_license_number text not null,
    created_at timestamp with time zone,
    transfer_request_id uuid references transfer_requests not null
    -- user_id uuid references auth.users not null
);

create table patient_clinical_preferences (
  user_id uuid references auth.users NOT NULL primary key,
  language text not null,
  chronic_conditions text[],
  allergies text,
  pharmacist_gender text,
  pharmacist_sexual_orientation text,
  race_or_ethnicity text
);

create table pharmacist_clinical_specialties (
  user_id uuid references auth.users NOT NULL primary key,
  languages text[] not null,
  preferred_chronic_conditions text[],
  pharmacist_gender text,
  pharmacist_sexual_orientation text,
  pharmacist_race_or_ethnicity text
);

CREATE TABLE pharmacist_licenses (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  pharmacist_id uuid references auth.users NOT NULL,
  full_name TEXT NOT NULL,
  license_number TEXT NOT NULL UNIQUE,
  license_type TEXT NOT NULL,
  issuing_state us_state NOT NULL,
  issue_date DATE NOT NULL,
  expiration_date DATE NOT NULL,
  status TEXT NOT NULL,
  -- address TEXT,
  -- education_and_training TEXT,
  -- disciplinary_actions TEXT,
  -- continuing_education TEXT,
  specializations TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

create table insurance_details (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    holder_first_name text NOT NULL,
    holder_last_name text NOT NULL,
    insurance_name text NOT NULL,
    insurance_id text NOT NULL,
    rx_group_num text NOT NULL,
    bin text NOT NULL,
    pcn text NOT NULL,
    insurance_num text NOT NULL,
    ssn text NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    user_id uuid references auth.users NOT NULL
);

create table payments_details (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    card_number text not null,
    expiration text not null, -- MM/YY
    cvv int not null,
    holder_first_name text not null,
    holder_last_name text not null,
    created_at timestamp with time zone not null,
    updated_at timestamp with time zone not null,
    user_id uuid references auth.users not null
    -- TODO: https://supabase.com/docs/guides/database/extensions/pgsodium hash payment information
);
-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
-- alter table profiles
--   enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

-- create policy "Users can insert their own profile." on profiles
--   for insert with check ((select auth.uid()) = id);

-- create policy "Users can update own profile." on profiles
--   for update using ((select auth.uid()) = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
-- create function public.handle_new_user() -- NOT USEFUL CAUSE ITS HARD TO DO IN A LOCAL ENV
-- returns trigger as $$
-- begin
--   insert into public.profiles (id, avatar_url)
--   values (new.id, new.raw_user_meta_data->>'avatar_url');
--   return new;
-- end;
-- $$ language plpgsql security definer;
-- create trigger on_auth_user_created
--   after insert on auth.users
--   for each row execute procedure public.handle_new_user();

-- Set up Storage!
insert into storage.buckets
  (id, name, public, file_size_limit)
values
  ('avatars', 'avatars', true, 1048576); -- 1 MB?

-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage/security/access-control#policy-examples for more details.
create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars');

create policy "Anyone can update their own avatar." on storage.objects
  for update using ((select auth.uid()) = owner) with check (bucket_id = 'avatars');


-- Get Started Info
create table patient_on_boarding_complete (
  user_id uuid references auth.users not null primary key,
  personal_info boolean NOT NULL DEFAULT false,
  transfer_info boolean NOT NULL DEFAULT false,
  clinical_info boolean NOT NULL DEFAULT false,
  payment_info boolean NOT NULL DEFAULT false,
  insurance_info boolean NOT NULL DEFAULT false
);

create table pharmacist_on_boarding_complete (
  user_id uuid references auth.users not null primary key,
  personal_info boolean NOT NULL DEFAULT false,
  license_info boolean NOT NULL DEFAULT false,
  clinical_info boolean NOT NULL DEFAULT false
);

create table pharmacist_to_patient_match (
  patient_id uuid references auth.users not null,
  pharmacist_id uuid references auth.users not null,
  created_at timestamp with time zone not null,
  updated_at timestamp with time zone not null,
  primary key(patient_id, pharmacist_id)
);

create table appointments (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  patient_id uuid references auth.users not null,
  pharmacist_id uuid references auth.users not null,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  meeting_reason text not null,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  start_time timestamp with time zone not null,
  end_time timestamp with time zone not null,
  duration_minutes int not null
);

create table prescriptions (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  patient_id uuid references auth.users not null,
  -- approved_by uuid[] references auth.users not null, -- Pharmacist Approvals
  name text,
  label text,
  price text,
  quantity text,
  ndc text,
  dosage text,
  drugFormId text,
  drugCategoryId text,
  drugClassId text,
  drugTypeId text,
  ageGroupId text,
  refillable boolean,
  refillLimit text,
  tierOne text,
  tierTwo text,
  tierThree text,
  tierFour text,
  tierFive text,
  erxRequired text,
  active boolean,
  minQuantity text,
  maxQuantity text,
  quantityAllowed text,
  -- softDeleted boolean,
  created_at timestamp with time zone not null,
  updated_at timestamp with time zone not null
);
