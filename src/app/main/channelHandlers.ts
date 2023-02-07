import { IpcMainEvent } from 'electron';
import { IElectronApiChannels } from '../../common/types';

type MainChannelHandlers = Record<
  IElectronApiChannels,
  (event: IpcMainEvent, ...args: unknown[]) => void
>;

export function createMainApiHandlers(): MainChannelHandlers {
  return {
    'select-db-file': () => {
      // TODO: handle
      console.log('select file');
    },
  };
}
