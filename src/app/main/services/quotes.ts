import { Quote } from '../../../common/electronApi';
import {
  BOOKMARK_TABLE,
  BOOKMARK_TABLE_NAME,
  Bookmark,
} from '../models/Bookmark';
import { CONTENT_TABLE, CONTENT_TABLE_NAME } from '../models/Content';
import { KoboDatabase } from '../models/KoboDatabase';
import DatabaseClient from '../utilities/databaseClient';

export async function getQuotes(koboDBClient: DatabaseClient<KoboDatabase>) {
  return koboDBClient.execute<Quote[]>((db) => {
    return db
      .distinct(`${BOOKMARK_TABLE_NAME}.${BOOKMARK_TABLE.BOOKMARK_ID}`)
      .select([
        `${BOOKMARK_TABLE_NAME}.${BOOKMARK_TABLE.BOOKMARK_ID} as id`,
        `${BOOKMARK_TABLE_NAME}.${BOOKMARK_TABLE.TEXT} as text`,
        `${BOOKMARK_TABLE_NAME}.${BOOKMARK_TABLE.ANNOTATION} as annotation`,
        `${CONTENT_TABLE_NAME}.${CONTENT_TABLE.BOOK_TITLE} as bookTitle`,
      ])
      .from<Bookmark>(BOOKMARK_TABLE_NAME)
      .leftJoin(
        CONTENT_TABLE_NAME,
        `${BOOKMARK_TABLE_NAME}.${BOOKMARK_TABLE.VOLUME_ID}`,
        `${CONTENT_TABLE_NAME}.${CONTENT_TABLE.BOOK_ID}`
      );
  });
}
