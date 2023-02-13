interface SelectDBFileChannel {
  name: 'select-db-file';
  value: string;
}

export type ElectronApiSendChannels = SelectDBFileChannel;

export type ElectronApiSendChannelNames = ElectronApiSendChannels['name'];

export type ElectronApiReceiveChannels = {
  name: string;
  handler: (...args: unknown[]) => void;
};

export type ElectronApiReceiveChannelNames = ElectronApiReceiveChannels['name'];

export interface ElectronApi {
  send: (channel: ElectronApiSendChannels) => void;
  receive: (channelHandler: {
    name: string;
    handler: (...args: unknown[]) => void;
  }) => void;
}
