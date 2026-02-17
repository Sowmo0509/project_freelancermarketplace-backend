ALTER TABLE "user"
ADD COLUMN "user_type" "user_type" DEFAULT 'client' NOT NULL;

ALTER TABLE "user"
ADD COLUMN "country" text;

