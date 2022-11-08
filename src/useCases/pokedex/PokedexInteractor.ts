import { Inject, Injectable } from '@nestjs/common';
import { Pokemon } from '../../domaine/Pokemon';
import { IConvertForApplicationPort } from '../../librairie/IConvertForApplicationPort';
import { IProvideGetPokedex } from '../ports/IProvideGetPokedex';
import { PokedexGetQueryBuilder } from '../queries/PokedexGetQuery';
import { PokedexAllUseCase } from './PokedexAllUseCase';
import { PokedexGetUseCase } from './PokedexGetlUseCase';
//IProvideGetPokedex, IProvideAddPokedex
@Injectable()
export class PokedexInteractor<Tout> {
  constructor(
    @Inject('IConvertPokemonToPortAggregate')
    private readonly entityConverter: IConvertForApplicationPort<Pokemon, Tout>,
    @Inject('IProvideGetPokedex')
    private readonly getProvider: IProvideGetPokedex
  ) {}

  async getAll(): Promise<Tout[]> {
    const useCase = new PokedexAllUseCase(this.getProvider);
    return (await useCase.execute({})).map(this.entityConverter.convert);
  }

  async getByName(name: string): Promise<Tout> {
    const query = new PokedexGetQueryBuilder().addName(name).build();
    const useCase = new PokedexGetUseCase(this.getProvider);

    return this.entityConverter.convert(await useCase.execute(query));
  }
}
