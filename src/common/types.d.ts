export interface ElectronApi {
  send: (channel: IElectronApiChannels, data: unknown) => void;
  receive: (
    channel: IElectronApiChannels,
    handler: (...args: unknown[]) => void
  ) => void;
}

export type IElectronApiChannels = 'select-db-file';
