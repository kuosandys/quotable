import { BrowserWindow } from 'electron';
import DatabaseManager from '../utilities/databaseManager';
import registerFileHandlers from './files';
import registerDatabaseHandlers from './db';

export const registerMainHandlers = (
  browserWindow: BrowserWindow,
  databaseManager: DatabaseManager
) => {
  registerFileHandlers(browserWindow);
  registerDatabaseHandlers(databaseManager);
};
