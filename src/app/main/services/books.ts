import { Book } from '../../../common/electronApi';
import { CONTENT_TABLE, CONTENT_TABLE_NAME, Content } from '../models/Content';
import { KoboDatabase } from '../models/KoboDatabase';
import DatabaseClient from '../utilities/databaseClient';

export async function getBooks(dbClient: DatabaseClient<KoboDatabase>) {
  return dbClient.execute<Book[]>((db) => {
    return db
      .select(
        `${CONTENT_TABLE.BOOK_ID} as id`,
        `${CONTENT_TABLE.BOOK_TITLE} as title`
      )
      .from<Content>(CONTENT_TABLE_NAME);
  });
}
