import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { ELECTRON_API_KEY } from '../../common';
import {
  ElectronApi,
  ElectronApiSendChannels,
  ElectronApiSendChannelNames,
  ElectronApiReceiveChannels,
  ElectronApiReceiveChannelNames,
} from '../../common/types';

const api: ElectronApi = {
  // to main
  send: (channel: ElectronApiSendChannels) => {
    const allowedChannels: ElectronApiSendChannelNames[] = ['select-db-file'];
    if (allowedChannels.includes(channel.name)) {
      ipcRenderer.send(channel.name, channel.value);
    }
  },

  // from main
  receive: (channel: ElectronApiReceiveChannels) => {
    const allowedChannels: ElectronApiReceiveChannelNames[] = [];
    if (allowedChannels.includes(channel.name)) {
      ipcRenderer.on(channel.name, (_event: IpcRendererEvent, args) =>
        channel.handler(args)
      );
    }
  },
};

contextBridge.exposeInMainWorld(ELECTRON_API_KEY, api);
