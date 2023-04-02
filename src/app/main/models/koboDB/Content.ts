export interface Content {
  BookID: string;
  BookTitle: string;
}

export const CONTENT_TABLE_NAME = 'content';

export const CONTENT_TABLE: Record<Uppercase<keyof Content>, keyof Content> = {
  BOOKID: 'BookID',
  BOOKTITLE: 'BookTitle',
};
