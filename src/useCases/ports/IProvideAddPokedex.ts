import { Pokemon } from '../../domaine/Pokemon';
export interface IProvideAddPokedex {
  add(pokemon: Pokemon): PromiseLike<Pokemon>;
}
