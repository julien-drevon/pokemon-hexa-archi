import { Controller, Get, Inject } from '@nestjs/common';
import { PokemonEntityToAggregateConverter } from './application/converters/PokemonEntityToAggregateConverter';
import { PokemonA } from './application/domaine/pokemonA';
import { PokedexAllUseCase } from './useCases/pokedex/PokedexAllUseCase';
import { IProvideGetPokedex } from './useCases/ports/IProvideGetPokedex';

@Controller('NoInteractorPokedex')
export class NoInteractorPokedexController {
  constructor(
    @Inject('IProvideGetPokedex')
    private readonly pokedexProvider: IProvideGetPokedex,
    @Inject('IConvertPokemonToPortAggregate')
    private readonly pokmonConverter: PokemonEntityToAggregateConverter
  ) {}

  @Get()
  async getAll(): Promise<PokemonA[]> {
    const useCase = new PokedexAllUseCase(this.pokedexProvider);
    return (await useCase.execute({})).map(this.pokmonConverter.convert);
  }
}
