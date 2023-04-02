import { BrowserWindow, dialog, ipcMain } from 'electron';
import { InvokeChannelHandler } from './types';

async function handleDbFileSelection(
  browserWindow: BrowserWindow
): Promise<string | undefined> {
  const { canceled, filePaths } = await dialog.showOpenDialog(browserWindow, {
    filters: [{ name: '*', extensions: ['sqlite'] }],
    properties: ['openFile'],
  });

  if (canceled) {
    return;
  }
  return filePaths[0];
}

export default function (browserWindow: BrowserWindow) {
  const invokeChannels: InvokeChannelHandler[] = [
    {
      name: 'select-import-db',
      handler: async () => handleDbFileSelection(browserWindow),
    },
  ];

  invokeChannels.forEach(({ name, handler }) => ipcMain.handle(name, handler));
}
