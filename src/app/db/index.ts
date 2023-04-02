import { QuotableDatabase } from '../main/models/QuotableDatabase';
import DatabaseClient from '../main/utilities/databaseClient';

export async function ensureAppDB(dbClient: DatabaseClient<QuotableDatabase>) {
  await dbClient.open();
  return dbClient.test();
}
