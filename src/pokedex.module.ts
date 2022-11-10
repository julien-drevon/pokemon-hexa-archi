import { Module } from '@nestjs/common';
import { PokemonEntityToAggregateConverter } from './application/converters/PokemonEntityToAggregateConverter';
import { MemoryProvideGetPokedex } from './application/ports/secondary/MemoryProvidePokedex';
import { Pokemon } from './domaine/Pokemon';
import { NoInteractorPokedexController } from './NoInteractorPokedex.controller';
import { PokemonA } from './application/domaine/pokemonA';
import { PokedexInteractor } from './useCases/pokedex/PokedexInteractor';
import { InteractorPokedexController } from './InteractorPokedex.controlle';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalInterceptor } from './application/nest/GlobalInterceptor';

@Module({
  imports: [],
  controllers: [NoInteractorPokedexController, InteractorPokedexController],
  providers: [
    PokedexInteractor<PokemonA>,
    {
      provide: 'logger',
      useValue: console
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalInterceptor
    },
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
