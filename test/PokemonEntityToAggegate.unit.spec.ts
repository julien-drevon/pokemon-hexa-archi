import { PokemonEntityToAggregateConverter } from '../src/application/converters/PokemonEntityToAggregateConverter';
import { Pokemon } from '../src/domaine/Pokemon';

describe('Convert Pokemon domain to Pokemon api', () => {
  it('my pokemon should be convert', () => {
    const converter = new PokemonEntityToAggregateConverter();
    const assert = converter.convert(new Pokemon(1, 'pika'));

    expect(assert).toEqual({ id: 1, name: 'pika' });
  });
});
