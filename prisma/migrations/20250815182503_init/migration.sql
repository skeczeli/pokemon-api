/*
  Warnings:

  - The primary key for the `pokemons` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "public"."pokemons" DROP CONSTRAINT "pokemons_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "pokemons_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "pokemons_id_seq";
