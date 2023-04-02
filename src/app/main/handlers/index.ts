import { BrowserWindow } from 'electron';
import { KoboDatabase } from '../models/koboDB/KoboDatabase';
import DatabaseManager from '../utilities/databaseClient';
import registerDatabaseHandlers from './db';
import registerFileHandlers from './files';

export const registerMainHandlers = (
  browserWindow: BrowserWindow,
  koboDatabaseManager: DatabaseManager<KoboDatabase>
) => {
  registerDatabaseHandlers(koboDatabaseManager);
  registerFileHandlers(browserWindow);
};
