import { MongoClient } from 'mongodb';

class DbClient {
  public async connect() {
    const dbString = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017';
    const client = new MongoClient(dbString);
    try {
      const conn = await client.connect();
      return conn.db(process.env.DB_NAME);
    } catch (error) {
      console.error('Failed to connect to database', error);
    }
  }
}

export { DbClient };

