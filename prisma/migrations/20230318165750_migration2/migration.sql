-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "courseid" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_courseid_fkey" FOREIGN KEY ("courseid") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
