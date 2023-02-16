import { Content } from 'knex/types/tables';
import DatabaseManager from '../utilities/databaseManager';
import { CONTENT_TABLE_NAME } from './constants';

export async function getQuotes(db: DatabaseManager) {
  return db.getSelect<Content>(CONTENT_TABLE_NAME, ['BookID', 'BookTitle']);
}
