import { PrismaClient, PokemonDb } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  const pikatchu = await prisma.pokemonDb.upsert({
    where: { name: 'pikatchu' },
    update: {},
    create: {
      id: 1,
      name: 'pikatchu'
    }
  });
}
