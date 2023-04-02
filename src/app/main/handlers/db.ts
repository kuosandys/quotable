import { ipcMain } from 'electron';
import { Highlight } from '../../../common/electronApi';
import { KoboDatabase } from '../models/koboDB/KoboDatabase';
import { QuotableDatabase } from '../models/QuotableDatabase';
import * as highlightsService from '../services/highlights';
import * as koboImportService from '../services/koboImport';
import DatabaseClient from '../utilities/databaseClient';
import { InvokeChannelHandler } from './types';

async function handleImportFromKoboDB(
  koboDBClient: DatabaseClient<KoboDatabase>,
  quotableDBClient: DatabaseClient<QuotableDatabase>,
  filename: string
): Promise<number> {
  await koboDBClient.open(filename);
  await koboDBClient.test();
  const [highlightsData, _booksData] = await koboImportService.importFromKoboDB(
    koboDBClient
  );
  return highlightsService.insertHighlights(quotableDBClient, highlightsData);
}

async function handleGetHighlights(
  quotableDBClient: DatabaseClient<QuotableDatabase>
): Promise<Highlight[]> {
  return highlightsService.getHighlights(quotableDBClient);
}

export default function (
  koboDBClient: DatabaseClient<KoboDatabase>,
  quotableDBClient: DatabaseClient<QuotableDatabase>
) {
  const invokeChannels: InvokeChannelHandler[] = [
    {
      name: 'import-from-db',
      handler: async (_event, value: string) =>
        handleImportFromKoboDB(koboDBClient, quotableDBClient, value),
    },
    {
      name: 'get-highlights',
      handler: async () => handleGetHighlights(quotableDBClient),
    },
  ];

  invokeChannels.forEach(({ name, handler }) => ipcMain.handle(name, handler));
}
