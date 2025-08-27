-- CreateTable
CREATE TABLE "public"."Usage" (
    "id" SERIAL NOT NULL,
    "ip" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Usage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usage_ip_date_key" ON "public"."Usage"("ip", "date");
