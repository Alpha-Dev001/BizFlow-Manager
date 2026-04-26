/*
  Warnings:

  - Made the column `amount` on table `Payroll` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Payroll" ALTER COLUMN "amount" SET NOT NULL;
