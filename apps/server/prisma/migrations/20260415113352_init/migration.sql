-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "account" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "note" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "note_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "account_name_key" ON "account"("name");

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "note_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
