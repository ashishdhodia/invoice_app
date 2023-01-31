CREATE TABLE invoice_item_info (
    id SERIAL PRIMARY KEY NOT NULL,
    invoice_id character varying(255) NOT NULL,
    business_id character varying(255) NOT NULL,
    item_id character varying(255) NOT NULL,
    item_qty character varying(255) NOT NULL,
    item_tax character varying(255) NOT NULL,
    item_tax_amount character varying(255) NOT NULL,
    item_amount_wo_tax character varying(255) NOT NULL,
    item_amount_final character varying(255) NOT NULL,
    CONSTRAINT business_id FOREIGN KEY(business_id) REFERENCES business(business_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT invoice_id FOREIGN KEY(invoice_id) REFERENCES invoice(invoice_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT item_id FOREIGN KEY(item_id) REFERENCES item(item_id) ON DELETE CASCADE ON UPDATE CASCADE
);