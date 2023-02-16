import { contextBridge, ipcRenderer } from 'electron';
import { ELECTRON_API_KEY } from '../../common';
import * as electronApi from '../../common/electronApi';

const api: electronApi.Api = {
  // to main
  send: (channel: electronApi.SendChannels) => {
    switch (channel.name) {
      // ipcRenderer.send(channel.name, channel.value);
      default:
        return;
    }
  },

  invoke: ((channel: electronApi.InvokeChannels) => {
    switch (channel.name) {
      case 'select-database':
      case 'connect-database':
        return ipcRenderer.invoke(channel.name, channel.value);
      default:
        return;
    }
  }) as electronApi.Api['invoke'],

  // from main
  receive: (channel: electronApi.ReceiveChannels) => {
    switch (channel.name) {
      // ipcRenderer.on(channel.name, (_event: IpcRendererEvent, args) =>
      //   channel.handler(args))
      default:
        return;
    }
  },
};

contextBridge.exposeInMainWorld(ELECTRON_API_KEY, api);
