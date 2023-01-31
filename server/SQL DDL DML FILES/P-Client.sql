CREATE OR REPLACE FUNCTION generate_client_id(Id INT)
	returns text
	as
	$$
	  SELECT 'cid' || TO_CHAR(id,'FM0000');
	$$
	language sql
	immutable;

CREATE TABLE client (
    id SERIAL PRIMARY KEY NOT NULL,
    client_id character varying(100) GENERATED ALWAYS AS (generate_business_id(id)) STORED UNIQUE,
    business_id character varying(255) NOT NULL,
    client_name character varying(255) NOT NULL,
    client_address character varying(255) NOT NULL,
    client_city character varying(255) NOT NULL,
    client_state character varying(255) NOT NULL,
    client_phone character varying(255) NOT NULL,
    CONSTRAINT business_id FOREIGN KEY(business_id) REFERENCES business(business_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT uc_business_clientname UNIQUE (business_id, client_name)
);