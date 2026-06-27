--
-- PostgreSQL database dump
--

\restrict 5HhVLP6eSsts3MqeX0UfdGqPvDaGhzIOjBpf7I0tTrgGh8Gge6l67xIp2PYXgUC

-- Dumped from database version 16.13
-- Dumped by pg_dump version 16.13

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: application_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.application_status AS ENUM (
    'draft',
    'submitted',
    'under_review',
    'approved',
    'rejected'
);


--
-- Name: application_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.application_type AS ENUM (
    'new_registration',
    'renewal'
);


--
-- Name: assessment_method; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.assessment_method AS ENUM (
    'self',
    'consultant'
);


--
-- Name: auditor_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.auditor_role AS ENUM (
    'lead',
    'member'
);


--
-- Name: delivery_address_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.delivery_address_type AS ENUM (
    'factory',
    'billing',
    'other'
);


--
-- Name: factory_size; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.factory_size AS ENUM (
    'small',
    'medium',
    'large'
);


--
-- Name: upload_purpose; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.upload_purpose AS ENUM (
    'signature',
    'company_stamp',
    'checklist_doc',
    'sa_evidence'
);


--
-- Name: user_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.user_role AS ENUM (
    'super_admin',
    'standard_user',
    'factory',
    'admin',
    'auditor'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: applications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.applications (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    application_type public.application_type DEFAULT 'new_registration'::public.application_type NOT NULL,
    status public.application_status DEFAULT 'draft'::public.application_status NOT NULL,
    current_step smallint DEFAULT 1 NOT NULL,
    submitted_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id uuid,
    assigned_auditor_id uuid
);


--
-- Name: auditor_teams; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.auditor_teams (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    application_id uuid NOT NULL,
    auditing_org_name character varying(255),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: auditors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.auditors (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    application_id uuid NOT NULL,
    role public.auditor_role DEFAULT 'member'::public.auditor_role NOT NULL,
    sort_order smallint DEFAULT 1 NOT NULL,
    full_name character varying(255),
    organization character varying(255),
    phone character varying(20),
    email character varying(255),
    expertise_environment boolean DEFAULT false NOT NULL,
    expertise_social boolean DEFAULT false NOT NULL,
    expertise_ecoeconomics boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: company_info; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.company_info (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    application_id uuid NOT NULL,
    organization_name character varying(255) NOT NULL,
    factory_registration_no character varying(100),
    industry_type character varying(255),
    addr_no character varying(50),
    addr_moo character varying(20),
    addr_soi character varying(100),
    addr_road character varying(100),
    addr_industrial_estate character varying(100),
    addr_tambon character varying(100),
    addr_amphoe character varying(100),
    addr_province character varying(100),
    addr_postcode character varying(10),
    billing_company_name character varying(255),
    billing_addr_no character varying(50),
    billing_addr_moo character varying(20),
    billing_addr_soi character varying(100),
    billing_addr_road character varying(100),
    billing_addr_industrial_estate character varying(100),
    billing_addr_tambon character varying(100),
    billing_addr_amphoe character varying(100),
    billing_addr_province character varying(100),
    billing_addr_postcode character varying(10),
    billing_tax_id character(13),
    billing_branch character varying(100),
    billing_is_head_office boolean DEFAULT true NOT NULL,
    delivery_address_type public.delivery_address_type DEFAULT 'factory'::public.delivery_address_type NOT NULL,
    delivery_custom_address text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: consultants; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.consultants (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    application_id uuid NOT NULL,
    sort_order smallint DEFAULT 1 NOT NULL,
    full_name character varying(255),
    organization character varying(255),
    phone character varying(20),
    email character varying(255),
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: document_checklist; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.document_checklist (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    application_id uuid NOT NULL,
    item_no smallint NOT NULL,
    item_label character varying(255) NOT NULL,
    is_checked boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    prepared_by character varying(100),
    submitted_by character varying(100),
    item_group character(1) DEFAULT 'B'::bpchar,
    required_level character varying(20) DEFAULT 'required'::character varying,
    upload_type character varying(30) DEFAULT 'upload'::character varying,
    not_applicable boolean DEFAULT false NOT NULL,
    note text DEFAULT ''::text
);


--
-- Name: email_verifications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.email_verifications (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    token character varying(64) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    expires_at timestamp with time zone DEFAULT (now() + '24:00:00'::interval) NOT NULL,
    used_at timestamp with time zone
);


--
-- Name: file_uploads; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.file_uploads (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    application_id uuid NOT NULL,
    purpose public.upload_purpose NOT NULL,
    file_name character varying(255),
    file_path text,
    mime_type character varying(100),
    file_size_bytes integer,
    inline_data text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    item_no smallint,
    item_key character varying(20)
);


--
-- Name: meeting_contact; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.meeting_contact (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    application_id uuid NOT NULL,
    meeting_round_no smallint,
    meeting_date date,
    coord_name character varying(255),
    coord_position character varying(255),
    coord_phone character varying(20),
    coord_ext character varying(10),
    coord_mobile character varying(20),
    coord_email character varying(255),
    applicant_name character varying(255),
    applicant_position character varying(255),
    applicant_phone character varying(20),
    applicant_ext character varying(10),
    applicant_fax character varying(20),
    applicant_mobile character varying(20),
    applicant_email character varying(255),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: org_assessment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.org_assessment (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    application_id uuid NOT NULL,
    permanent_employee_count integer,
    outsource_employee_count integer,
    factory_size public.factory_size,
    assessment_method public.assessment_method DEFAULT 'self'::public.assessment_method NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: password_reset_tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.password_reset_tokens (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    token character varying(64) NOT NULL,
    expires_at timestamp with time zone DEFAULT (now() + '01:00:00'::interval) NOT NULL,
    used_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    filename text NOT NULL,
    applied_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: self_assessment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.self_assessment (
    application_id uuid NOT NULL,
    items jsonb DEFAULT '[]'::jsonb NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: user_certificates; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_certificates (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    file_name character varying(255) NOT NULL,
    file_path text NOT NULL,
    uploaded_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email character varying(255) NOT NULL,
    password_hash text,
    full_name character varying(255) DEFAULT ''::character varying NOT NULL,
    role public.user_role DEFAULT 'standard_user'::public.user_role NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    organization character varying(255),
    phone character varying(50),
    "position" character varying(255),
    ext_number character varying(20),
    fax character varying(50),
    mobile character varying(50),
    education text,
    is_email_verified boolean DEFAULT false NOT NULL,
    google_id character varying(255),
    line_id character varying(255)
);


--
-- Name: waste_award_assessments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.waste_award_assessments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    factory_name text NOT NULL,
    factory_license_no text DEFAULT ''::text NOT NULL,
    coordinator_name text DEFAULT ''::text NOT NULL,
    coordinator_phone text DEFAULT ''::text NOT NULL,
    coordinator_email text DEFAULT ''::text NOT NULL,
    auditor_names text DEFAULT ''::text NOT NULL,
    assessment_date timestamp with time zone,
    assessment_time text DEFAULT ''::text NOT NULL,
    certification_level character varying(20) DEFAULT 'silver'::character varying NOT NULL,
    status character varying(20) DEFAULT 'draft'::character varying NOT NULL,
    created_by uuid,
    assigned_auditor_id uuid,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    address text DEFAULT ''::text NOT NULL,
    industrial_estate text DEFAULT ''::text NOT NULL,
    fax_number text DEFAULT ''::text NOT NULL,
    website text DEFAULT ''::text NOT NULL,
    application_type character varying(20) DEFAULT 'new_registration'::character varying NOT NULL,
    coordinator_position text DEFAULT ''::text NOT NULL,
    coordinator_department text DEFAULT ''::text NOT NULL,
    coordinator2_name text DEFAULT ''::text NOT NULL,
    coordinator2_position text DEFAULT ''::text NOT NULL,
    coordinator2_department text DEFAULT ''::text NOT NULL,
    coordinator2_phone text DEFAULT ''::text NOT NULL,
    coordinator2_email text DEFAULT ''::text NOT NULL,
    phone text DEFAULT ''::text NOT NULL,
    factory_notified boolean DEFAULT true NOT NULL
);


--
-- Name: waste_award_criteria; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.waste_award_criteria (
    assessment_id uuid NOT NULL,
    criteria_data jsonb DEFAULT '[]'::jsonb NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: waste_award_evidence_files; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.waste_award_evidence_files (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    assessment_id uuid NOT NULL,
    criterion_no integer NOT NULL,
    file_path text NOT NULL,
    file_name text DEFAULT ''::text NOT NULL,
    file_type text DEFAULT ''::text NOT NULL,
    uploaded_by uuid,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: waste_award_feedback; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.waste_award_feedback (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    assessment_id uuid NOT NULL,
    author_id uuid NOT NULL,
    author_role character varying(20) NOT NULL,
    message text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: wp_company_info; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wp_company_info (
    wp_audit_id uuid NOT NULL,
    company_name character varying(255) DEFAULT ''::character varying NOT NULL,
    factory_reg_no character varying(100) DEFAULT ''::character varying NOT NULL,
    industry_type character varying(50) DEFAULT ''::character varying NOT NULL,
    address text DEFAULT ''::text NOT NULL,
    main_service text DEFAULT ''::text NOT NULL,
    fixed_assets numeric,
    annual_revenue numeric,
    company_size character varying(20) DEFAULT ''::character varying NOT NULL,
    permanent_employees integer,
    outsource_employees integer,
    working_hours_per_shift numeric,
    assessment_date date,
    followup_start date,
    followup_end date,
    production_data jsonb DEFAULT '[]'::jsonb NOT NULL,
    org_chart_file_id uuid,
    factory_map_file_id uuid,
    process_map_file_id uuid,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: wp_general_requirements; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wp_general_requirements (
    wp_audit_id uuid NOT NULL,
    m2a_legal_compliance boolean,
    m2a_legal_doc text DEFAULT ''::text NOT NULL,
    m2a_env_systems jsonb DEFAULT '{}'::jsonb NOT NULL,
    m2a_no_complaints boolean,
    m2a_govt_programs text DEFAULT ''::text NOT NULL,
    m2a_govt_doc text DEFAULT ''::text NOT NULL,
    m2b_b1_law_compliance boolean,
    m2b_b1_best_practices boolean,
    m2b_b2_overall_score numeric,
    m2b_b2_main_step_score numeric,
    m2b_b3_level character varying(20) DEFAULT ''::character varying NOT NULL,
    m2b_b3_cert_date date,
    m2b_b3_cert_file_id uuid,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: wp_self_audits; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wp_self_audits (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    status character varying(20) DEFAULT 'draft'::character varying NOT NULL,
    current_step smallint DEFAULT 1 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: wp_specific_assessment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wp_specific_assessment (
    wp_audit_id uuid NOT NULL,
    items jsonb DEFAULT '[]'::jsonb NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: wp_standard; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wp_standard (
    wp_audit_id uuid NOT NULL,
    m4_intake_checks jsonb DEFAULT '{}'::jsonb NOT NULL,
    m4_process_checks jsonb DEFAULT '{}'::jsonb NOT NULL,
    m4_reporting_checks jsonb DEFAULT '{}'::jsonb NOT NULL,
    m5_selected_issues jsonb DEFAULT '[]'::jsonb NOT NULL,
    m5_eco_efficiency jsonb DEFAULT '{}'::jsonb NOT NULL,
    m5_community_projects jsonb DEFAULT '[]'::jsonb NOT NULL,
    m5_trend_chart_file_id uuid,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: wp_summary; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wp_summary (
    wp_audit_id uuid NOT NULL,
    m2a_pass boolean,
    m2b_pass boolean,
    m3_total_score smallint,
    m3_applicable_max smallint,
    m3_percentage numeric,
    m4_pass boolean,
    m5_pass boolean,
    overall_pass boolean,
    sig_preparer_name character varying(255) DEFAULT ''::character varying NOT NULL,
    sig_preparer_position character varying(255) DEFAULT ''::character varying NOT NULL,
    sig_preparer_date date,
    sig_preparer_data text,
    sig_executive_name character varying(255) DEFAULT ''::character varying NOT NULL,
    sig_executive_position character varying(255) DEFAULT ''::character varying NOT NULL,
    sig_executive_date date,
    sig_executive_data text,
    sig_auditor_name character varying(255) DEFAULT ''::character varying NOT NULL,
    sig_auditor_position character varying(255) DEFAULT ''::character varying NOT NULL,
    sig_auditor_date date,
    sig_auditor_data text,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: applications applications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_pkey PRIMARY KEY (id);


--
-- Name: auditor_teams auditor_teams_application_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auditor_teams
    ADD CONSTRAINT auditor_teams_application_id_key UNIQUE (application_id);


--
-- Name: auditor_teams auditor_teams_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auditor_teams
    ADD CONSTRAINT auditor_teams_pkey PRIMARY KEY (id);


--
-- Name: auditors auditors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auditors
    ADD CONSTRAINT auditors_pkey PRIMARY KEY (id);


--
-- Name: company_info company_info_application_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.company_info
    ADD CONSTRAINT company_info_application_id_key UNIQUE (application_id);


--
-- Name: company_info company_info_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.company_info
    ADD CONSTRAINT company_info_pkey PRIMARY KEY (id);


--
-- Name: consultants consultants_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.consultants
    ADD CONSTRAINT consultants_pkey PRIMARY KEY (id);


--
-- Name: document_checklist document_checklist_application_id_item_no_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.document_checklist
    ADD CONSTRAINT document_checklist_application_id_item_no_key UNIQUE (application_id, item_no);


--
-- Name: document_checklist document_checklist_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.document_checklist
    ADD CONSTRAINT document_checklist_pkey PRIMARY KEY (id);


--
-- Name: email_verifications email_verifications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.email_verifications
    ADD CONSTRAINT email_verifications_pkey PRIMARY KEY (id);


--
-- Name: email_verifications email_verifications_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.email_verifications
    ADD CONSTRAINT email_verifications_token_key UNIQUE (token);


--
-- Name: file_uploads file_uploads_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.file_uploads
    ADD CONSTRAINT file_uploads_pkey PRIMARY KEY (id);


--
-- Name: meeting_contact meeting_contact_application_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.meeting_contact
    ADD CONSTRAINT meeting_contact_application_id_key UNIQUE (application_id);


--
-- Name: meeting_contact meeting_contact_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.meeting_contact
    ADD CONSTRAINT meeting_contact_pkey PRIMARY KEY (id);


--
-- Name: org_assessment org_assessment_application_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.org_assessment
    ADD CONSTRAINT org_assessment_application_id_key UNIQUE (application_id);


--
-- Name: org_assessment org_assessment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.org_assessment
    ADD CONSTRAINT org_assessment_pkey PRIMARY KEY (id);


--
-- Name: password_reset_tokens password_reset_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_pkey PRIMARY KEY (id);


--
-- Name: password_reset_tokens password_reset_tokens_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_token_key UNIQUE (token);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (filename);


--
-- Name: self_assessment self_assessment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.self_assessment
    ADD CONSTRAINT self_assessment_pkey PRIMARY KEY (application_id);


--
-- Name: user_certificates user_certificates_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_certificates
    ADD CONSTRAINT user_certificates_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: waste_award_assessments waste_award_assessments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.waste_award_assessments
    ADD CONSTRAINT waste_award_assessments_pkey PRIMARY KEY (id);


--
-- Name: waste_award_criteria waste_award_criteria_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.waste_award_criteria
    ADD CONSTRAINT waste_award_criteria_pkey PRIMARY KEY (assessment_id);


--
-- Name: waste_award_evidence_files waste_award_evidence_files_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.waste_award_evidence_files
    ADD CONSTRAINT waste_award_evidence_files_pkey PRIMARY KEY (id);


--
-- Name: waste_award_feedback waste_award_feedback_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.waste_award_feedback
    ADD CONSTRAINT waste_award_feedback_pkey PRIMARY KEY (id);


--
-- Name: wp_company_info wp_company_info_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wp_company_info
    ADD CONSTRAINT wp_company_info_pkey PRIMARY KEY (wp_audit_id);


--
-- Name: wp_general_requirements wp_general_requirements_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wp_general_requirements
    ADD CONSTRAINT wp_general_requirements_pkey PRIMARY KEY (wp_audit_id);


--
-- Name: wp_self_audits wp_self_audits_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wp_self_audits
    ADD CONSTRAINT wp_self_audits_pkey PRIMARY KEY (id);


--
-- Name: wp_specific_assessment wp_specific_assessment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wp_specific_assessment
    ADD CONSTRAINT wp_specific_assessment_pkey PRIMARY KEY (wp_audit_id);


--
-- Name: wp_standard wp_standard_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wp_standard
    ADD CONSTRAINT wp_standard_pkey PRIMARY KEY (wp_audit_id);


--
-- Name: wp_summary wp_summary_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wp_summary
    ADD CONSTRAINT wp_summary_pkey PRIMARY KEY (wp_audit_id);


--
-- Name: idx_email_ver_token; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_email_ver_token ON public.email_verifications USING btree (token);


--
-- Name: idx_email_ver_user; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_email_ver_user ON public.email_verifications USING btree (user_id);


--
-- Name: idx_password_reset_tokens_token; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_password_reset_tokens_token ON public.password_reset_tokens USING btree (token);


--
-- Name: idx_users_google_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX idx_users_google_id ON public.users USING btree (google_id) WHERE (google_id IS NOT NULL);


--
-- Name: idx_users_line_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX idx_users_line_id ON public.users USING btree (line_id) WHERE (line_id IS NOT NULL);


--
-- Name: waste_award_evidence_files_assessment_id_criterion_no_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX waste_award_evidence_files_assessment_id_criterion_no_idx ON public.waste_award_evidence_files USING btree (assessment_id, criterion_no);


--
-- Name: waste_award_feedback_assessment_id_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX waste_award_feedback_assessment_id_created_at_idx ON public.waste_award_feedback USING btree (assessment_id, created_at);


--
-- Name: applications applications_assigned_auditor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_assigned_auditor_id_fkey FOREIGN KEY (assigned_auditor_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: applications applications_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: auditor_teams auditor_teams_application_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auditor_teams
    ADD CONSTRAINT auditor_teams_application_id_fkey FOREIGN KEY (application_id) REFERENCES public.applications(id) ON DELETE CASCADE;


--
-- Name: auditors auditors_application_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.auditors
    ADD CONSTRAINT auditors_application_id_fkey FOREIGN KEY (application_id) REFERENCES public.applications(id) ON DELETE CASCADE;


--
-- Name: company_info company_info_application_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.company_info
    ADD CONSTRAINT company_info_application_id_fkey FOREIGN KEY (application_id) REFERENCES public.applications(id) ON DELETE CASCADE;


--
-- Name: consultants consultants_application_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.consultants
    ADD CONSTRAINT consultants_application_id_fkey FOREIGN KEY (application_id) REFERENCES public.applications(id) ON DELETE CASCADE;


--
-- Name: document_checklist document_checklist_application_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.document_checklist
    ADD CONSTRAINT document_checklist_application_id_fkey FOREIGN KEY (application_id) REFERENCES public.applications(id) ON DELETE CASCADE;


--
-- Name: email_verifications email_verifications_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.email_verifications
    ADD CONSTRAINT email_verifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: file_uploads file_uploads_application_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.file_uploads
    ADD CONSTRAINT file_uploads_application_id_fkey FOREIGN KEY (application_id) REFERENCES public.applications(id) ON DELETE CASCADE;


--
-- Name: meeting_contact meeting_contact_application_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.meeting_contact
    ADD CONSTRAINT meeting_contact_application_id_fkey FOREIGN KEY (application_id) REFERENCES public.applications(id) ON DELETE CASCADE;


--
-- Name: org_assessment org_assessment_application_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.org_assessment
    ADD CONSTRAINT org_assessment_application_id_fkey FOREIGN KEY (application_id) REFERENCES public.applications(id) ON DELETE CASCADE;


--
-- Name: password_reset_tokens password_reset_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: self_assessment self_assessment_application_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.self_assessment
    ADD CONSTRAINT self_assessment_application_id_fkey FOREIGN KEY (application_id) REFERENCES public.applications(id) ON DELETE CASCADE;


--
-- Name: user_certificates user_certificates_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_certificates
    ADD CONSTRAINT user_certificates_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: waste_award_assessments waste_award_assessments_assigned_auditor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.waste_award_assessments
    ADD CONSTRAINT waste_award_assessments_assigned_auditor_id_fkey FOREIGN KEY (assigned_auditor_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: waste_award_assessments waste_award_assessments_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.waste_award_assessments
    ADD CONSTRAINT waste_award_assessments_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: waste_award_criteria waste_award_criteria_assessment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.waste_award_criteria
    ADD CONSTRAINT waste_award_criteria_assessment_id_fkey FOREIGN KEY (assessment_id) REFERENCES public.waste_award_assessments(id) ON DELETE CASCADE;


--
-- Name: waste_award_evidence_files waste_award_evidence_files_assessment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.waste_award_evidence_files
    ADD CONSTRAINT waste_award_evidence_files_assessment_id_fkey FOREIGN KEY (assessment_id) REFERENCES public.waste_award_assessments(id) ON DELETE CASCADE;


--
-- Name: waste_award_evidence_files waste_award_evidence_files_uploaded_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.waste_award_evidence_files
    ADD CONSTRAINT waste_award_evidence_files_uploaded_by_fkey FOREIGN KEY (uploaded_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: waste_award_feedback waste_award_feedback_assessment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.waste_award_feedback
    ADD CONSTRAINT waste_award_feedback_assessment_id_fkey FOREIGN KEY (assessment_id) REFERENCES public.waste_award_assessments(id) ON DELETE CASCADE;


--
-- Name: waste_award_feedback waste_award_feedback_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.waste_award_feedback
    ADD CONSTRAINT waste_award_feedback_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: wp_company_info wp_company_info_wp_audit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wp_company_info
    ADD CONSTRAINT wp_company_info_wp_audit_id_fkey FOREIGN KEY (wp_audit_id) REFERENCES public.wp_self_audits(id) ON DELETE CASCADE;


--
-- Name: wp_general_requirements wp_general_requirements_wp_audit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wp_general_requirements
    ADD CONSTRAINT wp_general_requirements_wp_audit_id_fkey FOREIGN KEY (wp_audit_id) REFERENCES public.wp_self_audits(id) ON DELETE CASCADE;


--
-- Name: wp_self_audits wp_self_audits_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wp_self_audits
    ADD CONSTRAINT wp_self_audits_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: wp_specific_assessment wp_specific_assessment_wp_audit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wp_specific_assessment
    ADD CONSTRAINT wp_specific_assessment_wp_audit_id_fkey FOREIGN KEY (wp_audit_id) REFERENCES public.wp_self_audits(id) ON DELETE CASCADE;


--
-- Name: wp_standard wp_standard_wp_audit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wp_standard
    ADD CONSTRAINT wp_standard_wp_audit_id_fkey FOREIGN KEY (wp_audit_id) REFERENCES public.wp_self_audits(id) ON DELETE CASCADE;


--
-- Name: wp_summary wp_summary_wp_audit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wp_summary
    ADD CONSTRAINT wp_summary_wp_audit_id_fkey FOREIGN KEY (wp_audit_id) REFERENCES public.wp_self_audits(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict 5HhVLP6eSsts3MqeX0UfdGqPvDaGhzIOjBpf7I0tTrgGh8Gge6l67xIp2PYXgUC
