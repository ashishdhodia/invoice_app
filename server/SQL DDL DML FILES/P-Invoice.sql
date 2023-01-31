CREATE OR REPLACE FUNCTION generate_invoice_id(Id INT)
	returns text
	as
	$$
	  SELECT 'inid' || TO_CHAR(id,'FM0000');
	$$
	language sql
	immutable;

CREATE TABLE invoice (
    id SERIAL PRIMARY KEY NOT NULL,
    invoice_id character varying(100) GENERATED ALWAYS AS (generate_invoice_id(id)) STORED UNIQUE,
    business_id character varying(255) NOT NULL,
    client_id character varying(255) NOT NULL,
    invoice_date date NOT NULL,
    invoice_due_date date NOT NULL,
    CONSTRAINT business_id FOREIGN KEY(business_id) REFERENCES business(business_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT client_id FOREIGN KEY(client_id) REFERENCES client(client_id) ON DELETE CASCADE ON UPDATE CASCADE
);