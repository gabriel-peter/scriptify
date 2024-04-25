--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.6 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = on;

INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) VALUES ('00000000-0000-0000-0000-000000000000', '1b05af15-5b2e-41e1-839c-e40a13d42348', 'authenticated', 'authenticated', 'gabepeter0817@gmail.com', '$2a$10$2GMZsa7xgzycHufGp7msqurtZZ4GrFg5/Js6Jk37GmSNNmmBK0XMu', '2024-04-25 20:06:22.47379+00', NULL, '', NULL, '', NULL, '', '', NULL, '2024-04-25 20:06:22.47533+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "1b05af15-5b2e-41e1-839c-e40a13d42348", "email": "gabepeter0817@gmail.com", "email_verified": false, "phone_verified": false}', NULL, '2024-04-25 20:06:22.46939+00', '2024-04-25 20:06:22.476656+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);

--
-- Data for Name: insurance_details; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: payments_details; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: prescription_transfers; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.profiles (id, updated_at, first_name, last_name, mailing_address, driver_license_url, avatar_url, preferences) VALUES ('1b05af15-5b2e-41e1-839c-e40a13d42348', NULL, NULL, NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: transfer_requests; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.transfer_requests (id, pharmacy_name, pharmacy_email, pharmacy_phone_number, mailing_address, updated_at, created_at, user_id, magic_url_key, request_status) VALUES ('b636f0c9-0531-4ae5-b9ca-5281f2410432', 'Boston Pharmacy #1', 'Boston Pharmacy #1', '3234624320', '{"city": "Chicago", "state": "IL", "postal_code": "60661", "street_address": "134 N Desplaines Street"}', '2024-04-25 20:07:53.139+00', '2024-04-25 20:07:53.139+00', '1b05af15-5b2e-41e1-839c-e40a13d42348', NULL, 'pending');


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.6 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = on;

--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- PostgreSQL database dump complete
--

