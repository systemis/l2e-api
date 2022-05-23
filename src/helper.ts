import { MongoMemoryServer } from 'mongodb-memory-server';
import { Keypair } from '@solana/web3.js';

export const getMemoryServerMongoDbUri = async () => {
  const mongodb = await MongoMemoryServer.create({
    instance: {
      dbName: Keypair.generate().publicKey.toBase58().toString(),
    }
  });

  return mongodb.getUri();
}