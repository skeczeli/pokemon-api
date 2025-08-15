-- CreateTable
CREATE TABLE "public"."pokemons" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "number" INTEGER NOT NULL,
    "ability" VARCHAR(100),
    "types" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pokemons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pokemons_name_key" ON "public"."pokemons"("name");

-- CreateIndex
CREATE UNIQUE INDEX "pokemons_number_key" ON "public"."pokemons"("number");
