/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `PokemonDb` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PokemonDb_name_key" ON "PokemonDb"("name");
