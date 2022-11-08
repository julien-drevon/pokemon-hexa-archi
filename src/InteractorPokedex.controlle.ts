import { Controller, Get, Inject } from '@nestjs/common';
import { PokemonA } from './application/domaine/pokemonA';
import { Pokemon } from './domaine/Pokemon';
import { IConvertForApplicationPort } from './librairie/IConvertForApplicationPort';
import { PokedexInteractor } from './useCases/pokedex/PokedexInteractor';

@Controller('InteractorPokedex')
export class InteractorPokedexController {
  constructor(
    //@Inject('PokedexInteractor<PokemonA>')
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
}
