import { BrowserWindow } from 'electron';
import { KoboDatabase } from '../models/koboDB/KoboDatabase';
import { QuotableDatabase } from '../models/QuotableDatabase';
import DatabaseManager from '../utilities/databaseClient';
import registerDatabaseHandlers from './db';
import registerFileHandlers from './files';

export const registerMainHandlers = (
  browserWindow: BrowserWindow,
  koboDatabaseManager: DatabaseManager<KoboDatabase>,
  qoutableDatabaseManager: DatabaseManager<QuotableDatabase>
) => {
  registerDatabaseHandlers(koboDatabaseManager, qoutableDatabaseManager);
  registerFileHandlers(browserWindow);
};
