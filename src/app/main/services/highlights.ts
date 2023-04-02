import { Highlight } from '../../../common/electronApi';
import {
  BOOKMARK_TABLE,
  BOOKMARK_TABLE_NAME,
  Bookmark,
} from '../models/koboDB/Bookmark';
import { CONTENT_TABLE, CONTENT_TABLE_NAME } from '../models/koboDB/Content';
import { KoboDatabase } from '../models/koboDB/KoboDatabase';
import DatabaseClient from '../utilities/databaseClient';

export async function getHighlights(
  koboDBClient: DatabaseClient<KoboDatabase>
) {
  return koboDBClient.execute<Highlight[]>((db) => {
    return db
      .distinct(`${BOOKMARK_TABLE_NAME}.${BOOKMARK_TABLE.BOOKMARKID}`)
      .select([
        `${BOOKMARK_TABLE_NAME}.${BOOKMARK_TABLE.BOOKMARKID} as id`,
        `${BOOKMARK_TABLE_NAME}.${BOOKMARK_TABLE.TEXT} as text`,
        `${BOOKMARK_TABLE_NAME}.${BOOKMARK_TABLE.ANNOTATION} as annotation`,
        `${CONTENT_TABLE_NAME}.${CONTENT_TABLE.BOOKTITLE} as bookTitle`,
      ])
      .from<Bookmark>(BOOKMARK_TABLE_NAME)
      .leftJoin(
        CONTENT_TABLE_NAME,
        `${BOOKMARK_TABLE_NAME}.${BOOKMARK_TABLE.VOLUMEID}`,
        `${CONTENT_TABLE_NAME}.${CONTENT_TABLE.BOOKID}`
      );
  });
}
