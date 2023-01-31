--Sign in function
CREATE
OR REPLACE FUNCTION SIGNIN(_username TEXT, _password TEXT) RETURNS jwt_token AS $$ DECLARE token_information jwt_token;

BEGIN
SELECT
    'invoice_app_user',
    username,
    business_id INTO token_information
FROM
    auth
WHERE
    username = _username
    AND auth.password_hash = crypt(_password, auth.password_hash);

RETURN token_information :: jwt_token;

END;

$$ LANGUAGE PLPGSQL VOLATILE STRICT SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION SIGNIN(_username TEXT, _password TEXT) TO anonymous;

SELECT signin('b_name', 'password')