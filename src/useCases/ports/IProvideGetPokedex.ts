import { Pokemon } from '../../domaine/Pokemon';

export interface IProvideGetPokedex {
  getById(byId: number): PromiseLike<Pokemon>;
  get(byName: string): PromiseLike<Pokemon>;
  all(): Pokemon[] | PromiseLike<Pokemon[]>;
}
