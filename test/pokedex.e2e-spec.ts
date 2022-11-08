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

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/NoInteractorPokedex')
      .expect(200)
      .expect([{ id: 1, name: 'pikatchu' }]);
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/InteractorPokedex')
      .expect(200)
      .expect([{ id: 1, name: 'pikatchu' }]);
  });
});
