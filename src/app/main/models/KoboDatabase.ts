import { Bookmark } from './Bookmark';
import { Content } from './Content';

export interface KoboDatabase {
  Bookmark: Bookmark;
  content: Content;
}
