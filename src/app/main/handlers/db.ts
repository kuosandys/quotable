import { ipcMain } from 'electron';
import { Quote } from '../../../common/electronApi';
import { KoboDatabase } from '../models/KoboDatabase';
import * as quotesService from '../services/quotes';
import DatabaseClient from '../utilities/databaseClient';
import { InvokeChannelHandler } from './types';

async function handleConnectToDatabase(
  koboDBClient: DatabaseClient<KoboDatabase>,
  filename: string
): Promise<void> {
  await koboDBClient.open(filename);
  return koboDBClient.test();
}

async function handleGetQuotes(
  koboDBClient: DatabaseClient<KoboDatabase>
): Promise<Quote[]> {
  return quotesService.getQuotes(koboDBClient);
}

export default function (koboDBClient: DatabaseClient<KoboDatabase>) {
  const invokeChannels: InvokeChannelHandler[] = [
    {
      name: 'connect-database',
      handler: async (_event, value: string) =>
        handleConnectToDatabase(koboDBClient, value),
    },
    {
      name: 'get-quotes',
      handler: async () => handleGetQuotes(koboDBClient),
    },
  ];

  invokeChannels.forEach(({ name, handler }) => ipcMain.handle(name, handler));
}
