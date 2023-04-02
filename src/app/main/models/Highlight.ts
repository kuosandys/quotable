export interface Highlight {
  id: number;
  text: string;
  annotation: string;
  dateCreated: Date;
  bookId: number;
}

export const HIGHLIGHT_TABLE_NAME = 'highlight';

export const HIGHLIGHT_TABLE: Record<
  Uppercase<keyof Highlight>,
  keyof Highlight
> = {
  ID: 'id',
  TEXT: 'text',
  ANNOTATION: 'annotation',
  DATECREATED: 'dateCreated',
  BOOKID: 'bookId',
};
