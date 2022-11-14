import { PokedexMemoryProvider } from '../src/application/ports/secondary/PokedexMemoryProvider';
import { Pokemon } from '../src/domaine/Pokemon';
import { PokedexAddUseCase } from '../src/useCases/pokedex/PokedexAddUseCase';
import { PokedexAllUseCase } from '../src/useCases/pokedex/PokedexAllUseCase';
import { PokedexGetUseCase } from '../src/useCases/pokedex/PokedexGetlUseCase';

describe('PokedexUseCase', () => {
  const bulbizare = new Pokemon(1, 'bulbizare');
  const pikatchu = new Pokemon(2, 'pikatchu');

  //beforeEach(async () => {
  // const moduleFixture: TestingModule = await Test.createTestingModule({
  //   imports: [AppModule],
  // }).compile();
  // app = moduleFixture.createNestApplication();
  // await app.init();
  //});

  it('Given hunter when I have no pokemon should retrun empty source', async () => {
    const pokemonUseCase: PokedexAllUseCase = new PokedexAllUseCase(
      createProvider([])
    );
    expect(await pokemonUseCase.execute({})).toEqual([]);
  });

  it('Given hunter when I have 1 pokemon should retrun 1 pokemon', async () => {
    const pokemonUseCase: PokedexAllUseCase = new PokedexAllUseCase(
      createProvider([pikatchu])
    );
    expect(await pokemonUseCase.execute({})).toEqual([pikatchu]);
  });

  it('Given hunter when I call pikatchu should return pikatchu', async () => {
    const pokemonUseCase: PokedexGetUseCase = new PokedexGetUseCase(
      createProvider([bulbizare, pikatchu])
    );
    const assert = await pokemonUseCase.execute({ byName: 'pikatchu' });
    expect(assert).toEqual(pikatchu);
  });

  it('Given hunter when I call ID 1 should return pokemon with id 1', async () => {
    const pokemonUseCase: PokedexGetUseCase = new PokedexGetUseCase(
      createProvider([bulbizare, pikatchu])
    );
    const assert = await pokemonUseCase.execute({ byId: 2 });
    expect(assert).toEqual(pikatchu);
  });

  it('Given hunter when I catch pokemon should be added', async () => {
    const pokemonUseCase: PokedexAddUseCase = new PokedexAddUseCase(
      createProvider([bulbizare, pikatchu])
    );
    const assert = await pokemonUseCase.execute({ name: 'salameche' });
    expect(assert.name).toEqual('salameche');
  });

  it('Given hunter when I catch pokemon should be added with id', async () => {
    const pokemonUseCase: PokedexAddUseCase = new PokedexAddUseCase(
      createProvider([bulbizare, pikatchu])
    );
    const assert = await pokemonUseCase.execute({ name: 'salameche' });
    expect(assert.name).toEqual('salameche');
    expect(assert.id).toEqual(3);
  });
});

describe('pokedex scenarios', () => {
  const bulbizare = new Pokemon(0, 'bulbizare');
  const pikatchu = new Pokemon(1, 'pikatchu');

  it('Given hunter when I catch pokemon in not empty pokedex should could be get in collection', async () => {
    const initialProvider = createProvider([bulbizare, pikatchu]);
    const pokemonAddUseCase: PokedexAddUseCase = new PokedexAddUseCase(
      initialProvider
    );
    const pokemonGetUseCase: PokedexGetUseCase = new PokedexGetUseCase(
      initialProvider
    );

    const tortank = await pokemonAddUseCase.execute({ name: 'tortank' });
    expect(tortank.id).not.toBeUndefined();

    const assert = await pokemonGetUseCase.execute({ byId: tortank.id });
    expect(assert).toEqual(tortank);
  });
});

//let subject: Subject<Pokemon[]>;

function createProvider(pokemons: Pokemon[]) {
  //subject = new BehaviorSubject(pokemons);
  return new PokedexMemoryProvider(pokemons);
}
