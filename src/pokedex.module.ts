import { Module } from '@nestjs/common';
import { PokemonEntityToAggregateConverter } from './application/converters/PokemonEntityToAggregateConverter';
import { PokedexMemoryProvider } from './application/ports/secondary/PokedexMemoryProvider';
import { Pokemon } from './domaine/Pokemon';
import { NoInteractorPokedexController } from './NoInteractorPokedex.controller';
import { PokemonA } from './application/domaine/pokemonA';
import { PokedexInteractor } from './useCases/pokedex/PokedexInteractor';
import { InteractorPokedexController } from './InteractorPokedex.controlle';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalInterceptor } from './application/nest/GlobalInterceptor';

const pokemonMemoryProvider = new PokedexMemoryProvider([
  new Pokemon(1, 'pikatchu')
]);
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
      useExisting: PokedexMemoryProvider
    },
    {
      provide: 'IProvideAddPokedex',
      useExisting: PokedexMemoryProvider
    },
    {
      provide: PokedexMemoryProvider,
      useValue: new PokedexMemoryProvider([new Pokemon(1, 'pikatchu')])
    }
  ]
})
export class PokedexModule {
  // pokemonProvider = new PokedexMemoryProvider([new Pokemon(1, 'pikatchu')]);
}
