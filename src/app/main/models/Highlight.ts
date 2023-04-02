export interface Highlight {
  id: number;
  text: string;
  annotation: string;
  date_created: Date;
  book_id: number;
}

export const HIGHLIGHT_TABLE_NAME = 'highlight';

export const HIGHLIGHT_TABLE: Record<
  Uppercase<keyof Highlight>,
  keyof Highlight
> = {
  ID: 'id',
  TEXT: 'text',
  ANNOTATION: 'annotation',
  DATE_CREATED: 'date_created',
  BOOK_ID: 'book_id',
};
