export interface Content {
  BookID: string;
  BookTitle: string;
}

export const CONTENT_TABLE_NAME = 'content';

export const CONTENT_TABLE: Record<string, keyof Content> = {
  BOOK_ID: 'BookID',
  BOOK_TITLE: 'BookTitle',
};
