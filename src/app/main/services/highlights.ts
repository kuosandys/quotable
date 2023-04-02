import {
  Highlight,
  HIGHLIGHT_TABLE,
  HIGHLIGHT_TABLE_NAME,
} from '../models/Highlight';
import { Bookmark } from '../models/koboDB/Bookmark';
import { QuotableDatabase } from '../models/QuotableDatabase';
import { DB_INSERT_CHUNKSIZE } from '../utilities/constants';
import DatabaseClient from '../utilities/databaseClient';

function mapBookmarkToHighlight(bookmark: Bookmark): Highlight {
  return {
    id: parseInt(bookmark.BookmarkID),
    text: bookmark.Text,
    annotation: bookmark.Annotation,
    dateCreated: new Date(bookmark.DateCreated), // TODO check format
    bookId: parseInt(bookmark.VolumeID),
  };
}

export async function getHighlights(
  quotableDBClient: DatabaseClient<QuotableDatabase>
): Promise<Highlight[]> {
  return quotableDBClient.execute<Highlight[]>((db) => {
    return db
      .distinct(HIGHLIGHT_TABLE.ID)
      .select('*')
      .from(HIGHLIGHT_TABLE_NAME);
  });
}

export async function insertHighlights(
  quotableDBClient: DatabaseClient<QuotableDatabase>,
  bookmarks: Bookmark[]
): Promise<number> {
  const result = await quotableDBClient.execute<typeof HIGHLIGHT_TABLE.ID[]>(
    (db) => {
      const highlights = bookmarks.map(mapBookmarkToHighlight);
      return db
        .batchInsert(HIGHLIGHT_TABLE_NAME, highlights, DB_INSERT_CHUNKSIZE)
        .returning(HIGHLIGHT_TABLE.ID);
    }
  );
  return result.length;
}
