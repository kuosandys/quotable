export interface Bookmark {
  BookmarkID: string;
  Text: string;
  Annotation: string;
  Type: 'highlight' | 'note';
  DateModified: string;
  DateCreated: string;
  VolumeID: string;
}

export const BOOKMARK_TABLE_NAME = 'Bookmark';

export const BOOKMARK_TABLE: Record<
  Uppercase<keyof Bookmark>,
  keyof Bookmark
> = {
  BOOKMARKID: 'BookmarkID',
  TEXT: 'Text',
  ANNOTATION: 'Annotation',
  TYPE: 'Type',
  DATEMODIFIED: 'DateModified',
  DATECREATED: 'DateCreated',
  VOLUMEID: 'VolumeID',
};
