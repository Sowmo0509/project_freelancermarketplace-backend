CREATE TYPE "user_type_new" AS ENUM ('client', 'freelancer', 'admin');

ALTER TABLE "user"
ALTER COLUMN "user_type" DROP DEFAULT;

ALTER TABLE "user"
ALTER COLUMN "user_type" TYPE "user_type_new"
USING CASE
  WHEN "user_type" = 'client' THEN 'client'::"user_type_new"
  WHEN "user_type" = 'freelancer' THEN 'freelancer'::"user_type_new"
  WHEN "user_type" = 'admin' THEN 'admin'::"user_type_new"
  WHEN "user_type" = 'both' THEN 'client'::"user_type_new"
  ELSE 'client'::"user_type_new"
END;

DROP TYPE "user_type";

ALTER TYPE "user_type_new" RENAME TO "user_type";

ALTER TABLE "user"
ALTER COLUMN "user_type" SET DEFAULT 'client';

ALTER TABLE "user"
ADD COLUMN "banned" boolean DEFAULT false NOT NULL;
