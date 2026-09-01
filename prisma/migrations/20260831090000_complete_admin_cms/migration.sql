-- Complete the public-content CMS: publication state, career ordering, and audit trail.
ALTER TABLE "articles"
  ADD COLUMN "is_published" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "published_at" TIMESTAMP(3);

-- Existing articles were already public before publication state existed.
UPDATE "articles"
SET "is_published" = true,
    "published_at" = "created_at";

ALTER TABLE "careers"
  ADD COLUMN "order" INTEGER NOT NULL DEFAULT 0;

CREATE TABLE "audit_logs" (
  "id" TEXT NOT NULL,
  "user_id" TEXT,
  "action" TEXT NOT NULL,
  "table" TEXT NOT NULL,
  "record_id" TEXT NOT NULL,
  "old_values" TEXT,
  "new_values" TEXT,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "audit_logs_user_id_idx" ON "audit_logs"("user_id");
CREATE INDEX "audit_logs_table_record_id_idx" ON "audit_logs"("table", "record_id");

ALTER TABLE "audit_logs"
  ADD CONSTRAINT "audit_logs_user_id_fkey"
  FOREIGN KEY ("user_id") REFERENCES "users"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;
