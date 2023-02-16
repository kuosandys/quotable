import { ipcMain } from 'electron';
import DatabaseManager from '../utilities/databaseManager';
import { InvokeChannelHandler } from './types';

export default function (databaseManager: DatabaseManager) {
  const invokeChannels: InvokeChannelHandler[] = [
    {
      name: 'connect-database',
      handler: async (_event, value: string) => {
        return databaseManager.open(value);
      },
    },
  ];

  invokeChannels.forEach(({ name, handler }) => ipcMain.handle(name, handler));
}
