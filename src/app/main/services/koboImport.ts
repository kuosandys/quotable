import {
  Bookmark,
  BOOKMARK_TABLE,
  BOOKMARK_TABLE_NAME,
} from '../models/koboDB/Bookmark';
import {
  Content,
  CONTENT_TABLE,
  CONTENT_TABLE_NAME,
} from '../models/koboDB/Content';
import { KoboDatabase } from '../models/koboDB/KoboDatabase';
import DatabaseClient from '../utilities/databaseClient';

async function importBookmarksFromKoboDB(
  koboDBClient: DatabaseClient<KoboDatabase>
) {
  return koboDBClient.execute<Bookmark[]>((db) => {
    return db
      .distinct(BOOKMARK_TABLE.BOOKMARKID)
      .select([
        BOOKMARK_TABLE.BOOKMARKID,
        BOOKMARK_TABLE.TEXT,
        BOOKMARK_TABLE.ANNOTATION,
        BOOKMARK_TABLE.DATECREATED,
        BOOKMARK_TABLE.VOLUMEID,
      ])
      .from(BOOKMARK_TABLE_NAME);
  });
}

async function importContentFromKoboDB(
  koboDBClient: DatabaseClient<KoboDatabase>
) {
  return koboDBClient.execute<Content[]>((db) => {
    return db
      .distinct(CONTENT_TABLE.BOOKID)
      .select([CONTENT_TABLE.BOOKID, CONTENT_TABLE.BOOKTITLE])
      .from(CONTENT_TABLE_NAME);
  });
}

export async function importFromKoboDB(
  koboDBClient: DatabaseClient<KoboDatabase>
): Promise<[Bookmark[], Content[]]> {
  return Promise.all([
    importBookmarksFromKoboDB(koboDBClient),
    importContentFromKoboDB(koboDBClient),
  ]);
}
