import { IpcMainInvokeEvent } from 'electron';
import * as electronApi from '../../../common/electronApi';

type DistributeInvoke<U extends electronApi.InvokeChannelsWithReturn> =
  U extends any
    ? {
        name: U['name'];
        handler: (
          event: IpcMainInvokeEvent,
          value: U['value']
        ) => Promise<U['returnValue']>;
      }
    : never;

export type InvokeChannelHandler =
  DistributeInvoke<electronApi.InvokeChannelsWithReturn>;
