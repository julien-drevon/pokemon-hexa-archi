import { Pokemon } from '../../domaine/Pokemon';
import { IConvertForApplicationPort } from '../../librairie/IConvertForApplicationPort';
import { PokemonA } from '../domaine/pokemonA';

export class PokemonEntityToAggregateConverter
  implements IConvertForApplicationPort<Pokemon, PokemonA>
{
  convert(data: Pokemon): PokemonA {
    return {
      id: data.id,
      name: data.name
    };
  }
}
