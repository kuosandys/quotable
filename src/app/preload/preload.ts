import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { ELECTRON_API_KEY } from '../../common/constants';
import { ElectronApi, IElectronApiChannels } from '../../common/types';

const api: ElectronApi = {
  // to main
  send: (channel: IElectronApiChannels, data: unknown) => {
    const allowedChannels: IElectronApiChannels[] = ['select-db-file'];
    if (allowedChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },

  // from main
  receive: (
    channel: IElectronApiChannels,
    handler: (...args: unknown[]) => void
  ) => {
    const allowedChannels: IElectronApiChannels[] = [];
    if (allowedChannels.includes(channel)) {
      ipcRenderer.on(channel, (_event: IpcRendererEvent, ...args: unknown[]) =>
        handler(...args)
      );
    }
  },
};

contextBridge.exposeInMainWorld(ELECTRON_API_KEY, api);
