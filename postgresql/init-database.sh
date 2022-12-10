#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "Rashit" --dbname "TaskTracker" <<-EOSQL
	CREATE ROLE Rashit with SUPERUSER PASSWORD aderader;
	
	CREATE DATABASE TaskTracker
    WITH
    OWNER = "Rashit"
    ENCODING = 'UTF8'
    LC_COLLATE = 'Russian_Russia.1251'
    LC_CTYPE = 'Russian_Russia.1251'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
	
	GRANT ALL PRIVILEGES ON DATABASE TaskTracker TO Rashit;
	
	\connect TaskTracker
	
	CREATE TABLE IF NOT EXISTS public."__EFMigrationsHistory"
	(
		migration_id character varying(150) COLLATE pg_catalog."default" NOT NULL,
		product_version character varying(32) COLLATE pg_catalog."default" NOT NULL,
		CONSTRAINT pk___ef_migrations_history PRIMARY KEY (migration_id)
	)

	TABLESPACE pg_default;

	ALTER TABLE IF EXISTS public."__EFMigrationsHistory"
		OWNER to "Rashit";

	-- Table: public.projects

	-- DROP TABLE IF EXISTS public.projects;

	CREATE TABLE IF NOT EXISTS public.projects
	(
		id uuid NOT NULL,
		start_date timestamp without time zone NOT NULL,
		finish_date timestamp without time zone NOT NULL,
		status integer NOT NULL,
		created timestamp without time zone,
		modified timestamp without time zone,
		name text COLLATE pg_catalog."default" NOT NULL,
		priority integer NOT NULL,
		CONSTRAINT pk_projects PRIMARY KEY (id)
	)

	TABLESPACE pg_default;

	ALTER TABLE IF EXISTS public.projects
		OWNER to "Rashit";

	-- Table: public.securities

	-- DROP TABLE IF EXISTS public.securities;

	CREATE TABLE IF NOT EXISTS public.securities
	(
		id uuid NOT NULL,
		username text COLLATE pg_catalog."default" NOT NULL,
		password text COLLATE pg_catalog."default" NOT NULL,
		code text COLLATE pg_catalog."default" NOT NULL,
		email text COLLATE pg_catalog."default" NOT NULL,
		created timestamp without time zone,
		modified timestamp without time zone,
		name text COLLATE pg_catalog."default" NOT NULL,
		priority integer NOT NULL,
		CONSTRAINT pk_securities PRIMARY KEY (id)
	)

	TABLESPACE pg_default;

	ALTER TABLE IF EXISTS public.securities
		OWNER to "Rashit";

	-- Table: public.tasks

	-- DROP TABLE IF EXISTS public.tasks;

	CREATE TABLE IF NOT EXISTS public.tasks
	(
		id uuid NOT NULL,
		status integer NOT NULL,
		description text COLLATE pg_catalog."default" NOT NULL,
		project_id uuid NOT NULL,
		created timestamp without time zone,
		modified timestamp without time zone,
		name text COLLATE pg_catalog."default" NOT NULL,
		priority integer NOT NULL,
		CONSTRAINT pk_tasks PRIMARY KEY (id),
		CONSTRAINT fk_tasks_projects_project_id FOREIGN KEY (project_id)
			REFERENCES public.projects (id) MATCH SIMPLE
			ON UPDATE NO ACTION
			ON DELETE CASCADE
	)

	TABLESPACE pg_default;

	ALTER TABLE IF EXISTS public.tasks
		OWNER to "Rashit";
	-- Index: ix_tasks_project_id

	-- DROP INDEX IF EXISTS public.ix_tasks_project_id;

	CREATE INDEX IF NOT EXISTS ix_tasks_project_id
		ON public.tasks USING btree
		(project_id ASC NULLS LAST)
		TABLESPACE pg_default;
	
EOSQL