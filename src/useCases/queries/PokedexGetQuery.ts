import { IMBuilder } from '../../librairie/IMBuilder';

export class PokedexGetQuery {
  byName?: string = undefined;
  byId?: number = undefined;
}

export class PokedexGetQueryBuilder implements IMBuilder<PokedexGetQuery> {
  private _name: string;
  addName(name: string): PokedexGetQueryBuilder {
    if (name) {
      this._name = name.toLowerCase();
    }
    return this;
  }

  build(): PokedexGetQuery {
    return {
      byName: this._name,
      byId: undefined
    };
  }
}
