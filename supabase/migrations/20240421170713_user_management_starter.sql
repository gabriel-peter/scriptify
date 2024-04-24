-- Create a table for public profiles
-- TODO create CRUD reusable fields
create table profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  first_name text not null ,
  last_name text not null,
  mailing_address jsonb,
  driver_license_url text,
  postal_code text,
  avatar_url text,
  preferences json,
  constraint username_length check (char_length(username) >= 3)
);

create table transfer_requests (
    id uuid -- TODO auto increment
    updated_at timestamp with time zone,
    created_at timestamp with time zone,
    user_id uuid references auth.users not null,
    magic_url_key text not null,
    -- Pharmacy Data
)

create table prescription_transfers (
    drug_name text not null,
    rx_name text not null,
    refill_date timestamp with time zone,
    pharmacist_first_name text not null,
    pharmacist_last_name text not null,
    pharmacist_license_number text not null,
    created_at timestamp with time zone,
)

create table insurance_details (
    holder_first_name text,
    holder_last_name text,
    insurance_name text,
    insurance_id text,
    rx_group_num text,
    bin text,
    pcn text,
    insurance_num text,
    ssn text,
)

create table payments_details (
    card_number text not null,
    expiration date not null,
    cvv int not null,
    holder_first_name text not null,
    holder_last_name text not null,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,

    -- TODO: https://supabase.com/docs/guides/database/extensions/pgsodium hash payment information

)
-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own profile." on profiles
  for update using ((select auth.uid()) = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Set up Storage!
insert into storage.buckets
  (id, name, public, allowed_mime_types, file_size_limit)
values
  ('avatars', 'avatars', true, ['image/*'], 1,048,576);

-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage/security/access-control#policy-examples for more details.
create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars');

create policy "Anyone can update their own avatar." on storage.objects
  for update using ((select auth.uid()) = owner) with check (bucket_id = 'avatars');