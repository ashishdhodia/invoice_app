CREATE OR REPLACE FUNCTION generate_business_id(Id INT)
	returns text
	as
	$$
	  SELECT 'bid' || TO_CHAR(id,'FM0000');
	$$
	language sql
	immutable;

CREATE TABLE business (
    id SERIAL PRIMARY KEY NOT NULL,
    business_id character varying(100) GENERATED ALWAYS AS (generate_business_id(id)) STORED UNIQUE,
    business_name character varying(255) NOT NULL,
    business_address character varying(255) NOT NULL,
    business_city character varying(255) NOT NULL,
    business_state character varying(255) NOT NULL,
    business_phone character varying(255) NOT NULL,
    business_email character varying(255) NOT NULL UNIQUE,
    registration_date date NOT NULL
);