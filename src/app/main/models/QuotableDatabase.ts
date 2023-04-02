import { Book, BOOK_TABLE_NAME } from './Book';
import { Highlight, HIGHLIGHT_TABLE_NAME } from './Highlight';

export interface QuotableDatabase {
  [BOOK_TABLE_NAME]: Book;
  [HIGHLIGHT_TABLE_NAME]: Highlight;
}
