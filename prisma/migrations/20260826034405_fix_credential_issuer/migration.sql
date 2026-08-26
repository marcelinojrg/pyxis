-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "issuer" SET DEFAULT 'local:credential';

UPDATE "accounts"
SET "issuer" = 'local:credential'
WHERE "provider_id" = 'credential' AND "issuer" = 'credential';
