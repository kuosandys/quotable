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

export const BOOKMARK_TABLE: Record<string, keyof Bookmark> = {
  BOOKMARK_ID: 'BookmarkID',
  TEXT: 'Text',
  ANNOTATION: 'Annotation',
  TYPE: 'Type',
  DATE_MODIFIED: 'DateModified',
  DATE_CREATED: 'DateCreated',
  VOLUME_ID: 'VolumeID',
};
