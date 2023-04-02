import { Bookmark, BOOKMARK_TABLE_NAME } from './Bookmark';
import { Content, CONTENT_TABLE_NAME } from './Content';

export interface KoboDatabase {
  [BOOKMARK_TABLE_NAME]: Bookmark;
  [CONTENT_TABLE_NAME]: Content;
}
