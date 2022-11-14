import { PokemonEntityToAggregateConverter } from '../src/application/converters/PokemonEntityToAggregateConverter';
import { PokemonA } from '../src/application/domaine/pokemonA';
import { PokedexMemoryProvider } from '../src/application/ports/secondary/PokedexMemoryProvider';
import { Pokemon } from '../src/domaine/Pokemon';
import { PokedexInteractor } from '../src/useCases/pokedex/PokedexInteractor';
import {
  PokedexPrismaProvider,
  PrismaService
} from '../src/application/ports/secondary/PokedexPrismaProvider';
import { PokemonDbToAggregateConverter } from '../src/application/converters/PokemonDbToAggregateConverter';

describe('PokedexUseCase', () => {
  const bulbizare = new Pokemon(1, 'bulbizare');
  const pikatchu = new Pokemon(2, 'pikatchu');
  let intercator: PokedexInteractor<PokemonA>;

  beforeEach(() => {
    if (process.env.NODE_ENV.toLowerCase() === 'e2e') {
      const provider = new PokedexPrismaProvider(
        new PrismaService(),
        new PokemonDbToAggregateConverter()
      );
      intercator = new PokedexInteractor<PokemonA>(
        new PokemonEntityToAggregateConverter(),
        provider,
        provider
      );
    } else {
      const provider = new PokedexMemoryProvider([bulbizare, pikatchu]);
      intercator = new PokedexInteractor<PokemonA>(
        new PokemonEntityToAggregateConverter(),
        provider,
        provider
      );
    }
  });

  it('pikatchu should return pikatchu', async () => {
    const assert = await intercator.getByName('pikatchu');
    expect(assert.name).toEqual(pikatchu.name);
    expect(assert.id).toEqual(pikatchu.id);
  });

  it('PiKAtchu should return pikatchu', async () => {
    const assert = await intercator.getByName('PiKAtchu');
    expect(assert.name).toEqual(pikatchu.name);
    expect(assert.id).toEqual(pikatchu.id);
  });

  it('"" should return null', async () => {
    const assert = await intercator.getByName('');
    expect(assert).toEqual(null);
  });

  it('null should return null', async () => {
    const assert = await intercator.getByName(null);
    expect(assert).toEqual(null);
  });

  it('undefined should return null', async () => {
    const assert = await intercator.getByName(undefined);
    expect(assert).toEqual(null);
  });

  it('create new pokemon should return pokemon witth id', async () => {
    const assert = await intercator.add('tortank');
    expect(assert.name).toEqual('tortank');
    expect(assert.id).not.toEqual(0);
  });

  // it('add same pokemon name should return error',async ()=>{

  // })
});
