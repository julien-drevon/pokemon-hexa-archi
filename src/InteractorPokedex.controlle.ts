import { Controller, Get, Inject, Param } from '@nestjs/common';
import { PokemonA } from './application/domaine/pokemonA';
import { Pokemon } from './domaine/Pokemon';
import { IConvertForApplicationPort } from './librairie/IConvertForApplicationPort';
import { PokedexInteractor } from './useCases/pokedex/PokedexInteractor';

@Controller('InteractorPokedex')
export class InteractorPokedexController {
  constructor(
    private readonly pokedexInteractor: PokedexInteractor<PokemonA>,
    @Inject('IConvertPokemonToPortAggregate')
    private readonly pokmonConverter: IConvertForApplicationPort<
      Pokemon,
      PokemonA
    >
  ) {}

  @Get()
  async getAll(): Promise<PokemonA[]> {
    return await this.pokedexInteractor.getAll();
  }

  @Get('byName/:name')
  async getByName(@Param('name') name: string): Promise<PokemonA> {
    return await this.pokedexInteractor.getByName(name);
  }
}
