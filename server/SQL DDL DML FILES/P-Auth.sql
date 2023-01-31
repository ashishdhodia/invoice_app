CREATE TABLE auth (
    id SERIAL PRIMARY KEY NOT NULL,
    business_id character varying(255) NOT NULL UNIQUE,
    username character varying(255) NOT NULL UNIQUE,
    password_hash character varying(255) NOT NULL,
    business_email character varying(255) NOT NULL UNIQUE,
    CONSTRAINT business_id FOREIGN KEY(business_id) REFERENCES business(business_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT business_email FOREIGN KEY(business_email) REFERENCES business(business_email) ON DELETE CASCADE ON UPDATE CASCADE
);