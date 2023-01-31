create extension if not exists "pgcrypto";

CREATE ROLE anonymous;

GRANT anonymous TO current_user;

CREATE ROLE invoice_app_user;

GRANT invoice_app_user TO current_user;

CREATE TYPE public.jwt_token AS (
    role TEXT,
    username TEXT,
    business_id TEXT
);

-- business_name, business_address, business_city, business_state, business_phone, business_email, registration_date, username, password
CREATE OR REPLACE FUNCTION SIGNUP(
    _business_name TEXT,
    _business_address TEXT,
    _business_city TEXT,
    _business_state TEXT,
    _business_phone TEXT,
    _business_email TEXT,
    _registration_date DATE,
    _username TEXT,
    _password TEXT
) RETURNS jwt_token AS $$ DECLARE token_information jwt_token; 

b_id TEXT;

BEGIN
INSERT INTO
    business(
        business_name,
        business_address,
        business_city,
        business_state,
        business_phone,
        business_email,
        registration_date
    )
VALUES
    (
        _business_name,
        _business_address,
        _business_city,
        _business_state,
        _business_phone,
        _business_email,
        _registration_date
    );

b_id := (
    SELECT
        business_id
    from
        business
    where
        business_name = _business_name
);

INSERT INTO 
	auth (
        business_id,
        username,
        password_hash,
        business_email
    )
VALUES 
    (
        b_id,
        _username,
        crypt(_password, gen_salt('bf', 8)),
        _business_email
    );

SELECT
    'invoice_app_user',
    username,
    business_id INTO token_information
FROM
    auth
WHERE
    business_email = _business_email;

RETURN token_information::jwt_token;

END;

$$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;

-- grant permissions to be able to sign up

GRANT EXECUTE ON FUNCTION SIGNUP(
    _business_name TEXT,
    _business_address TEXT,
    _business_city TEXT,
    _business_state TEXT,
    _business_phone TEXT,
    _business_email TEXT,
    _registration_date DATE,
    _username TEXT,
    _password TEXT
) TO anonymous;

Select signup('b_name','b_address','b_city','b_state','b_phone','b_email','2023-01-20','b_name','password');