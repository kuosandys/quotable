import { IpcMainEvent } from 'electron';
import { ElectronApiSendChannels } from '../../../common';

type Distribute<U extends ElectronApiSendChannels> = U extends any
  ? {
      name: U['name'];
      handler: (event: IpcMainEvent, value: U['value']) => void;
    }
  : never;

export type ElectronApiChannelHandler = Distribute<ElectronApiSendChannels>;
