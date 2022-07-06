import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@/app.module';
import * as request from 'supertest';
import { testHelper } from './test-entrypoint.e2e-spec';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    console.log('Going setup module fixture');

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    console.log('Done setup module fixture');

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(testHelper.app.getHttpServer())
      .get('/api/user/profile')
      .expect(200);
  });
});
