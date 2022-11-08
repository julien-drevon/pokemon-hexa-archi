import { IProvideGetPokedex } from '../ports/IProvideGetPokedex';
import { Pokemon } from '../../domaine/Pokemon';
import { IMPromiseUseCase } from '../../librairie/IMPromiseUseCase';
import { PokedexGetQuery } from '../queries/PokedexGetQuery';

export class PokedexGetUseCase
  implements IMPromiseUseCase<PokedexGetQuery, Pokemon>
{
  constructor(private pokedexProvider: IProvideGetPokedex) {}

  async execute(query: PokedexGetQuery): Promise<Pokemon> {
    if (query.byName) return await this.pokedexProvider.get(query.byName);
    else return await this.pokedexProvider.getById(query.byId);
  }
  // all(): Observable<any> {
  //   return of([]);
}
