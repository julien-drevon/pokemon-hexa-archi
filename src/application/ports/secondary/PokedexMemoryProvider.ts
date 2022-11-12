import { Pokemon } from '../../../domaine/Pokemon';
import { IProvideGetPokedex } from '../../../useCases/ports/IProvideGetPokedex';
import { IProvideAddPokedex } from '../../../useCases/ports/IProvideAddPokedex';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PokedexMemoryProvider
  implements IProvideGetPokedex, IProvideAddPokedex
{
  private static increment: number;

  constructor(private pokemons: Pokemon[]) {
    PokedexMemoryProvider.increment = Math.max(...pokemons.map((p) => p.id));
    if (!PokedexMemoryProvider.increment) {
      PokedexMemoryProvider.increment = 0;
    }
    PokedexMemoryProvider.increment++;
  }

  async add(pokemon: Pokemon): Promise<Pokemon> {
    if (!pokemon.id) {
      pokemon = new Pokemon(PokedexMemoryProvider.increment++, pokemon.name);
    }
    this.pokemons.push(pokemon);
    return pokemon;
  }
  async getById(byId: number): Promise<Pokemon> {
    return this.pokemons.filter((pokemon) => pokemon.id === byId)[0];
  }
  async get(byName: string): Promise<Pokemon> {
    return this.pokemons.filter((pokemon) => pokemon.name === byName)[0];
  }
  async all(): Promise<Pokemon[]> {
    return [...this.pokemons];
  }
}
