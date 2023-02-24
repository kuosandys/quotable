import { ipcMain } from 'electron';
import { Highlight } from '../../../common/electronApi';
import { KoboDatabase } from '../models/KoboDatabase';
import * as highlightsService from '../services/highlights';
import DatabaseClient from '../utilities/databaseClient';
import { InvokeChannelHandler } from './types';

async function handleConnectToDatabase(
  koboDBClient: DatabaseClient<KoboDatabase>,
  filename: string
): Promise<void> {
  await koboDBClient.open(filename);
  return koboDBClient.test();
}

async function handleGetHighlights(
  koboDBClient: DatabaseClient<KoboDatabase>
): Promise<Highlight[]> {
  return highlightsService.getHighlights(koboDBClient);
}

export default function (koboDBClient: DatabaseClient<KoboDatabase>) {
  const invokeChannels: InvokeChannelHandler[] = [
    {
      name: 'connect-database',
      handler: async (_event, value: string) =>
        handleConnectToDatabase(koboDBClient, value),
    },
    {
      name: 'get-highlights',
      handler: async () => handleGetHighlights(koboDBClient),
    },
  ];

  invokeChannels.forEach(({ name, handler }) => ipcMain.handle(name, handler));
}
