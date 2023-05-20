/*
  Warnings:

  - You are about to drop the column `courseid` on the `Note` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_courseid_fkey";

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "courseid";

-- CreateTable
CREATE TABLE "_CourseToNote" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToNote_AB_unique" ON "_CourseToNote"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToNote_B_index" ON "_CourseToNote"("B");

-- AddForeignKey
ALTER TABLE "_CourseToNote" ADD CONSTRAINT "_CourseToNote_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToNote" ADD CONSTRAINT "_CourseToNote_B_fkey" FOREIGN KEY ("B") REFERENCES "Note"("id") ON DELETE CASCADE ON UPDATE CASCADE;
