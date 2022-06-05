import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { globalApply } from '@/main';
import { getMemoryServerMongoDbUri } from '@/helper';
import { AppModule } from './../src/app.module';
import mongoose from 'mongoose';
jest.useFakeTimers()

export class TestHelper {
  public static TEST_MONGO_URI: string = process.env.TEST_MONGO_URI;
  public app: INestApplication;
  public moduleFixture: TestingModule;

  private async cleanDb() {
    return new Promise(async (resolve) => {
      const uri = await getMemoryServerMongoDbUri();
      mongoose.connect(uri, async () => {
        await mongoose.connection.db.dropDatabase();
        resolve(true);
      });
    });
  }

  public async bootTestingApp() {
    await this.cleanDb();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    console.log('Done setup module fixture');
    console.log('Init app');

    this.app = moduleFixture.createNestApplication();

    await this.app.init();
  }

  public async shutDownTestingApp() {
    await mongoose.connection.close();
  }
}