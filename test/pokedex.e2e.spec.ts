import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PokedexModule } from '../src/pokedex.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PokedexModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET NoInteractorPokedex)', () => {
    return request(app.getHttpServer())
      .get('/NoInteractorPokedex')
      .expect(200)
      .expect([{ id: 1, name: 'pikatchu' }]);
  });

  it('/ (GET NoInteractorPokedex/byName/pikatchu)', () => {
    //getByName
    return request(app.getHttpServer())
      .get('/NoInteractorPokedex/byName/pikatchu')
      .expect(200)
      .expect({ id: 1, name: 'pikatchu' });
  });

  it('/ (GET InteractorPokedex)', () => {
    return request(app.getHttpServer())
      .get('/InteractorPokedex')
      .expect(200)
      .expect([{ id: 1, name: 'pikatchu' }]);
  });

  it('/ (GET InteractorPokedex/getByName/pikatchu)', () => {
    return request(app.getHttpServer())
      .get('/InteractorPokedex/byName/pikatchu')
      .expect(200)
      .expect({ id: 1, name: 'pikatchu' });
  });
});
