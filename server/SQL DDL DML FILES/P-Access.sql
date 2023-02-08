GRANT SELECT, INSERT, UPDATE, DELETE ON auth TO invoice_app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON business TO invoice_app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON client TO invoice_app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON invoice TO invoice_app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON item TO invoice_app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON invoice_item_info TO invoice_app_user;

GRANT USAGE, SELECT ON SEQUENCE auth_id_seq TO invoice_app_user;
GRANT USAGE, SELECT ON SEQUENCE business_id_seq TO invoice_app_user;
GRANT USAGE, SELECT ON SEQUENCE client_id_seq TO invoice_app_user;
GRANT USAGE, SELECT ON SEQUENCE invoice_id_seq TO invoice_app_user;
GRANT USAGE, SELECT ON SEQUENCE item_id_seq TO invoice_app_user;
GRANT USAGE, SELECT ON SEQUENCE invoice_item_info_id_seq TO invoice_app_user;

-- row level security policy

CREATE OR REPLACE FUNCTION current_user_id() RETURNS VARCHAR(100) AS $$
  -- The content of the JWT token is stored in jwt.claims
  -- The user id is stored accordingly in jwt.claims.user_id
  SELECT NULLIF(current_setting('jwt.claims.business_id', TRUE), '')::VARCHAR(100);
$$ LANGUAGE SQL STABLE;

GRANT EXECUTE ON FUNCTION current_user_id() TO invoice_app_user;

ALTER TABLE business ENABLE ROW LEVEL SECURITY;
ALTER TABLE client ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice ENABLE ROW LEVEL SECURITY;
ALTER TABLE item ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_item_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY own_business_data ON business TO invoice_app_user USING (business_id = current_user_id()) WITH CHECK (business_id = current_user_id());
CREATE POLICY own_client_data ON client TO invoice_app_user USING (business_id = current_user_id()) WITH CHECK (business_id = current_user_id());
CREATE POLICY own_invoice_data ON invoice TO invoice_app_user USING (business_id = current_user_id()) WITH CHECK (business_id = current_user_id());
CREATE POLICY own_item_data ON item TO invoice_app_user USING (business_id = current_user_id()) WITH CHECK (business_id = current_user_id());
CREATE POLICY own_invoice_item_info_data ON invoice_item_info TO invoice_app_user USING (business_id = current_user_id()) WITH CHECK (business_id = current_user_id());

