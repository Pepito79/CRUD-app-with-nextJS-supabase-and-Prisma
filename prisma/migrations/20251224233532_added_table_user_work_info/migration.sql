-- CreateTable
CREATE TABLE "UserWorkingInfo" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "comp_status" TEXT NOT NULL,
    "numb_workers" INTEGER NOT NULL,
    "siret" TEXT,

    CONSTRAINT "UserWorkingInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserWorkingInfo_userId_key" ON "UserWorkingInfo"("userId");

-- AddForeignKey
ALTER TABLE "UserWorkingInfo" ADD CONSTRAINT "UserWorkingInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
