CREATE OR REPLACE FUNCTION generate_item_id(Id INT)
	returns text
	as
	$$
	  SELECT 'itmid' || TO_CHAR(id,'FM0000');
	$$
	language sql
	immutable;

CREATE TABLE item (
    id SERIAL PRIMARY KEY NOT NULL,
    item_id character varying(255) GENERATED ALWAYS AS (generate_item_id(id)) STORED UNIQUE,
    item_name character varying(255) NOT NULL,
    item_price character varying(255) NOT NULL,
    business_id character varying(255) NOT NULL,
    CONSTRAINT business_id FOREIGN KEY(business_id) REFERENCES business(business_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT uc_business_itemname UNIQUE (business_id, item_name)
);  