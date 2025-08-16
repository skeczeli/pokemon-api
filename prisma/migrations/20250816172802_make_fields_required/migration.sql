/*
  Warnings:

  - Made the column `ability` on table `pokemons` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageUrl` on table `pokemons` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."pokemons" ALTER COLUMN "ability" SET NOT NULL,
ALTER COLUMN "imageUrl" SET NOT NULL;
