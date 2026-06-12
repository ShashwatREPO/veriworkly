ALTER TABLE "users"
DROP COLUMN IF EXISTS "portfolioPlan",
DROP COLUMN IF EXISTS "portfolioCanPublish",
DROP COLUMN IF EXISTS "portfolioAccessEndsAt";

DROP TYPE IF EXISTS "PortfolioPlan";
