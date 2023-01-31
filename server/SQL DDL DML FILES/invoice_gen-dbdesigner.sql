CREATE TABLE "public.business" (
	"id" serial(255) NOT NULL,
	"business_id" varchar(255) NOT NULL UNIQUE,
	"business_name" varchar(255) NOT NULL,
	"business_address" varchar(255) NOT NULL,
	"business_city" varchar(255) NOT NULL,
	"business_state" varchar(255) NOT NULL,
	"business_phone" varchar(255) NOT NULL,
	"business_email" varchar(255) NOT NULL,
	"registration_date" DATE NOT NULL,
	CONSTRAINT "business_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.auth" (
	"id" serial(255) NOT NULL,
	"business_id" varchar(255) NOT NULL UNIQUE,
	"username" varchar(255) NOT NULL UNIQUE,
	"password_hash" varchar(255) NOT NULL,
	"password_salt" varchar(255) NOT NULL,
	"business_email" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "auth_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.client" (
	"id" serial(255) NOT NULL,
	"client_id" varchar(255) NOT NULL UNIQUE,
	"client_name" varchar(255) NOT NULL,
	"client_address" varchar(255) NOT NULL,
	"client_city" varchar(255) NOT NULL,
	"client_state" varchar(255) NOT NULL,
	"client_phone" varchar(255) NOT NULL,
	"business_id" varchar(255) NOT NULL,
	CONSTRAINT "client_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.item" (
	"id" serial(255) NOT NULL,
	"item_id" varchar(255) NOT NULL UNIQUE,
	"item_name" varchar(255) NOT NULL,
	"item_price" varchar(255) NOT NULL,
	"business_id" varchar(255) NOT NULL,
	CONSTRAINT "item_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.invoice" (
	"id" serial(255) NOT NULL,
	"invoice_id" varchar(255) NOT NULL UNIQUE,
	"business_id" varchar(255) NOT NULL,
	"client_id" varchar(255) NOT NULL,
	"invoice_date" DATE(255) NOT NULL,
	"invoice_due_date" DATE(255) NOT NULL,
	"invoice_value" varchar(255) NOT NULL,
	CONSTRAINT "invoice_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.invoice_item_info" (
	"id" serial(255) NOT NULL,
	"invoice_id" varchar(255) NOT NULL,
	"item_id" varchar(255) NOT NULL,
	"item_qty" integer(255) NOT NULL,
	"item_tax" varchar(255) NOT NULL,
	"item_tax_amount" varchar(255) NOT NULL,
	"item_amount_wo_tax" integer(255) NOT NULL,
	"item_amount_final" varchar(255) NOT NULL,
	CONSTRAINT "invoice_item_info_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "auth" ADD CONSTRAINT "auth_fk0" FOREIGN KEY ("business_id") REFERENCES "business"("business_id");
ALTER TABLE "auth" ADD CONSTRAINT "auth_fk1" FOREIGN KEY ("business_email") REFERENCES "business"("business_email");

ALTER TABLE "client" ADD CONSTRAINT "client_fk0" FOREIGN KEY ("business_id") REFERENCES "business"("business_id");

ALTER TABLE "item" ADD CONSTRAINT "item_fk0" FOREIGN KEY ("business_id") REFERENCES "business"("business_id");

ALTER TABLE "invoice" ADD CONSTRAINT "invoice_fk0" FOREIGN KEY ("business_id") REFERENCES "business"("business_id");
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_fk1" FOREIGN KEY ("client_id") REFERENCES "client"("client_id");

ALTER TABLE "invoice_item_info" ADD CONSTRAINT "invoice_item_info_fk0" FOREIGN KEY ("invoice_id") REFERENCES "invoice"("invoice_id");
ALTER TABLE "invoice_item_info" ADD CONSTRAINT "invoice_item_info_fk1" FOREIGN KEY ("item_id") REFERENCES "item"("item_id");






