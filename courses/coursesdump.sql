--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1

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
-- Name: courses; Type: DATABASE; Schema: -; Owner: kim
--

CREATE DATABASE courses WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_Jamaica.1252';


ALTER DATABASE courses OWNER TO kim;

\connect courses

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
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: adminusers; Type: TABLE; Schema: public; Owner: kim
--

CREATE TABLE public.adminusers (
    adminid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying(255) NOT NULL,
    user_email character varying(255) NOT NULL,
    user_password character varying(255) NOT NULL
);


ALTER TABLE public.adminusers OWNER TO kim;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: kim
--

CREATE TABLE public.comments (
    commentid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    coursesid uuid,
    comment_text character varying(255) NOT NULL,
    rating integer NOT NULL
);


ALTER TABLE public.comments OWNER TO kim;

--
-- Name: courses; Type: TABLE; Schema: public; Owner: kim
--

CREATE TABLE public.courses (
    coursesid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    course_name character varying(255) NOT NULL,
    departmentid uuid
);


ALTER TABLE public.courses OWNER TO kim;

--
-- Name: department; Type: TABLE; Schema: public; Owner: kim
--

CREATE TABLE public.department (
    departmentid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    department_name character varying(255) NOT NULL
);


ALTER TABLE public.department OWNER TO kim;

--
-- Name: skills; Type: TABLE; Schema: public; Owner: kim
--

CREATE TABLE public.skills (
    skillsid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    skill_name character varying(255) NOT NULL,
    coursesid uuid
);


ALTER TABLE public.skills OWNER TO kim;

--
-- Name: user_course; Type: TABLE; Schema: public; Owner: kim
--

CREATE TABLE public.user_course (
    coursesid uuid NOT NULL,
    userid uuid NOT NULL,
    is_completed boolean,
    the_length integer
);


ALTER TABLE public.user_course OWNER TO kim;

--
-- Name: users; Type: TABLE; Schema: public; Owner: kim
--

CREATE TABLE public.users (
    userid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_name character varying(255) NOT NULL,
    user_email character varying(255) NOT NULL,
    user_password character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO kim;

--
-- Name: adminusers adminusers_pkey; Type: CONSTRAINT; Schema: public; Owner: kim
--

ALTER TABLE ONLY public.adminusers
    ADD CONSTRAINT adminusers_pkey PRIMARY KEY (adminid);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: kim
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (commentid);


--
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: kim
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (coursesid);


--
-- Name: department department_pkey; Type: CONSTRAINT; Schema: public; Owner: kim
--

ALTER TABLE ONLY public.department
    ADD CONSTRAINT department_pkey PRIMARY KEY (departmentid);


--
-- Name: skills skills_pkey; Type: CONSTRAINT; Schema: public; Owner: kim
--

ALTER TABLE ONLY public.skills
    ADD CONSTRAINT skills_pkey PRIMARY KEY (skillsid);


--
-- Name: user_course user_course_pkey; Type: CONSTRAINT; Schema: public; Owner: kim
--

ALTER TABLE ONLY public.user_course
    ADD CONSTRAINT user_course_pkey PRIMARY KEY (coursesid, userid);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: kim
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- Name: comments comments_coursesid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kim
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_coursesid_fkey FOREIGN KEY (coursesid) REFERENCES public.courses(coursesid);


--
-- Name: courses courses_departmentid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kim
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_departmentid_fkey FOREIGN KEY (departmentid) REFERENCES public.department(departmentid);


--
-- Name: skills skills_coursesid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kim
--

ALTER TABLE ONLY public.skills
    ADD CONSTRAINT skills_coursesid_fkey FOREIGN KEY (coursesid) REFERENCES public.courses(coursesid);


--
-- Name: user_course user_course_coursesid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kim
--

ALTER TABLE ONLY public.user_course
    ADD CONSTRAINT user_course_coursesid_fkey FOREIGN KEY (coursesid) REFERENCES public.courses(coursesid);


--
-- Name: user_course user_course_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kim
--

ALTER TABLE ONLY public.user_course
    ADD CONSTRAINT user_course_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid);


--
-- PostgreSQL database dump complete
--

