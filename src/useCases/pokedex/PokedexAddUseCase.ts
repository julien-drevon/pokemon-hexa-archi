import { Pokemon } from '../../domaine/Pokemon';
import { IMPromiseUseCase } from '../../librairie/IMPromiseUseCase';
import { PokemonAddquery } from '../queries/PokemonAddquery';
import { IProvideAddPokedex } from '../ports/IProvideAddPokedex';

export class PokedexAddUseCase
  implements IMPromiseUseCase<PokemonAddquery, Pokemon>
{
  constructor(private pokedexProvider: IProvideAddPokedex) {}

  async execute(query: PokemonAddquery): Promise<Pokemon> {
    let pokemon = new Pokemon(undefined, query.name);
    pokemon = await this.pokedexProvider.add(pokemon);
    return pokemon;
  }
  // all(): Observable<any> {
  //   return of([]);
}
