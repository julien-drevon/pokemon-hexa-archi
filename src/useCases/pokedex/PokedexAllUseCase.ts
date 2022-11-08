import { IProvideGetPokedex } from '../ports/IProvideGetPokedex';
import { Pokemon } from '../../domaine/Pokemon';
import { IMPromiseUseCase } from '../../librairie/IMPromiseUseCase';
import { PokedexGeAllQuery } from '../queries/PokedexGetAllQuery';

export class PokedexAllUseCase
  implements IMPromiseUseCase<PokedexGeAllQuery, Pokemon[]>
{
  constructor(private pokedexProvider: IProvideGetPokedex) {}

  async execute(query: PokedexGeAllQuery): Promise<Pokemon[]> {
    return this.pokedexProvider.all();
  }
}
