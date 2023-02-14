export type SelectDBFileChannel = {
  name: 'select-db-file';
  value: undefined;
  returnValue: string | undefined;
};

export type SendChannels = { name: string; value: string };

export type InvokeChannelsWithReturn = SelectDBFileChannel;

export type InvokeChannels = Omit<InvokeChannelsWithReturn, 'returnValue'>;

export type ReceiveChannels = {
  name: string;
  handler: (...args: unknown[]) => void;
};

export type Api = {
  send: (channel: SendChannels) => void;
  invoke<T extends { name: string; returnValue?: unknown | undefined }>(
    channel: Pick<T, 'name'>
  ): Promise<T['returnValue']>;
  receive: (channel: ReceiveChannels) => void;
};
