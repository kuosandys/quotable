import { ipcMain } from 'electron';
import { Bookmark } from '../../../common/electronApi';
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
    {
      name: 'get-quotes',
      handler: async (_event) => {
        return databaseManager.getSelect<Bookmark>('Bookmark', [
          'BookmarkID',
          'Text',
          'Annotation',
          'Type',
          'DateModified',
          'DateCreated',
          'VolumeID',
        ]) as Promise<Bookmark[]>;
      },
    },
  ];

  invokeChannels.forEach(({ name, handler }) => ipcMain.handle(name, handler));
}
