import { IpcMainEvent, ipcRenderer } from 'electron';
import { ContextBridgeMainApi, MainApiNames } from '../../preload/types';

enum MainChannels {
  SelectDbFile = 'select-db-file',
}

type MainChannelHandlers = Record<
  MainChannels,
  (event: IpcMainEvent, ...args: string[]) => void
>;

export function createMainApiHandlers(): MainChannelHandlers {
  return {
    [MainChannels.SelectDbFile]: () => {
      // TODO: handle
      console.log('select file');
    },
  };
}

export function createMainApi(): ContextBridgeMainApi {
  return {
    [MainApiNames.SelectDbFile]: () =>
      ipcRenderer.send(MainChannels.SelectDbFile),
  };
}
