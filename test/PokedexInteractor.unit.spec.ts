import { PokemonEntityToAggregateConverter } from '../src/application/converters/PokemonEntityToAggregateConverter';
import { PokemonA } from '../src/application/domaine/pokemonA';
import { MemoryProvideGetPokedex } from '../src/application/ports/secondary/MemoryProvidePokedex';
import { Pokemon } from '../src/domaine/Pokemon';
import { PokedexInteractor } from '../src/useCases/pokedex/PokedexInteractor';

describe('PokedexUseCase', () => {
  const bulbizare = new Pokemon(1, 'bulbizare');
  const pikatchu = new Pokemon(2, 'pikatchu');
  let intercator: PokedexInteractor<PokemonA>;

  beforeEach(() => {
    intercator = new PokedexInteractor<PokemonA>(
      new PokemonEntityToAggregateConverter(),
      new MemoryProvideGetPokedex([bulbizare, pikatchu])
    );
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
});
