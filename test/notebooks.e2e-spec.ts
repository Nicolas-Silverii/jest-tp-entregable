import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('E2E: NotebooksController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('debería responder correctamente al GET /notebooks', async () => {
    const response = await request(app.getHttpServer())
      .get('/notebooks')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });
});
