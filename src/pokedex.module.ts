import { Module } from '@nestjs/common';
import { PokemonEntityToAggregateConverter } from './application/converters/PokemonEntityToAggregateConverter';
import { MemoryProvideGetPokedex } from './application/ports/secondary/MemoryProvidePokedex';
import { Pokemon } from './domaine/Pokemon';
import { NoInteractorPokedexController } from './noInteractorPokedex.controller';

import { PokemonA } from './application/domaine/pokemonA';
import { PokedexInteractor } from './useCases/pokedex/PokedexInteractor';
import { InteractorPokedexController } from './InteractorPokedex.controlle';
// @Inject('PokedexInteractor<PokemonA>')
// private readonly pokedexInteractor: PokedexInteractor<PokemonA>,
// @Inject('IConvertForApplicationPort<Pokemon, PokemonA>')
@Module({
  imports: [],
  controllers: [NoInteractorPokedexController, InteractorPokedexController],
  providers: [
    PokedexInteractor<PokemonA>,
    {
      provide: 'IConvertPokemonToPortAggregate',
      useClass: PokemonEntityToAggregateConverter
    },
    {
      provide: 'IProvideGetPokedex',
      useValue: new MemoryProvideGetPokedex([new Pokemon(1, 'pikatchu')])
    }
  ]
})
export class PokedexModule {}
