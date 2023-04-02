export interface Book {
  id: number;
  title: string;
  author: string;
}

export const BOOK_TABLE_NAME = 'book';

export const BOOK_TABLE: Record<Uppercase<keyof Book>, keyof Book> = {
  ID: 'id',
  TITLE: 'title',
  AUTHOR: 'author',
};
