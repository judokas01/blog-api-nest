-- CreateTable
CREATE TABLE "User" (
    "id" VARCHAR(36) NOT NULL,
    "pk" SERIAL NOT NULL,
    "username" VARCHAR(80) NOT NULL,
    "email" VARCHAR(80) NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" VARCHAR(36) NOT NULL,
    "pk" SERIAL NOT NULL,
    "title" VARCHAR(80) NOT NULL,
    "content" TEXT NOT NULL,
    "perex" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" VARCHAR(36) NOT NULL,
    "pk" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "authorNickName" VARCHAR(80) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upvoteScore" INTEGER NOT NULL DEFAULT 0,
    "upvoteHosts" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_pk_key" ON "User"("pk");

-- CreateIndex
CREATE UNIQUE INDEX "Article_pk_key" ON "Article"("pk");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_pk_key" ON "Comment"("pk");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
