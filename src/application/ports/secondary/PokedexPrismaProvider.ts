import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pokemon } from '../../../domaine/Pokemon';
import { IProvideAddPokedex } from '../../../useCases/ports/IProvideAddPokedex';
import { IProvideGetPokedex } from '../../../useCases/ports/IProvideGetPokedex';
import { PokemonDbToAggregateConverter } from '../../converters/PokemonDbToAggregateConverter';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}

@Injectable()
export class PokedexPrismaProvider
  implements IProvideGetPokedex, IProvideAddPokedex
{
  constructor(
    private prisma: PrismaService,
    private converter: PokemonDbToAggregateConverter
  ) {}
  async getById(byId: number): Promise<Pokemon> {
    return this.converter.convert(
      await this.prisma.pokemonDb.findUnique({ where: { id: byId } })
    );
  }
  async get(byName: string): Promise<Pokemon> {
    return this.converter.convert(
      await this.prisma.pokemonDb.findUnique({ where: { name: byName } })
    );
  }
  async all(): Promise<Pokemon[]> {
    return (await this.prisma.pokemonDb.findMany()).map(this.converter.convert);
  }
  async add(pokemon: Pokemon): Promise<Pokemon> {
    const added = await this.prisma.pokemonDb.create({
      data: { name: pokemon.name }
    });
    return this.converter.convert(added);
  }
}
