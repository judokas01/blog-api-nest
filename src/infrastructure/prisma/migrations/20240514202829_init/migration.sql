-- CreateTable
CREATE TABLE "GuenuePig" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "GuenuePig_pkey" PRIMARY KEY ("id")
);


INSERT INTO "GuenuePig" ("id", "name", "age") VALUES ('1', 'Piggy', 2);