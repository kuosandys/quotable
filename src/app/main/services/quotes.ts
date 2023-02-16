import { Bookmark } from 'knex/types/tables';
import DatabaseManager from '../utilities/databaseManager';
import { BOOKMARK_TABLE_NAME } from './constants';

export async function getBooks(db: DatabaseManager) {
  return db.getSelect<Bookmark>(BOOKMARK_TABLE_NAME, [
    'BookmarkID',
    'Text',
    'Annotation',
    'Type',
    'DateModified',
    'DateCreated',
    'VolumeID',
  ]);
}
