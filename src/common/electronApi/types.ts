export interface Quote {
  id: string;
  text: string;
  annotation?: string;
  bookTitle: string;
}

export interface Book {
  id: string;
  title: string;
}

export type SelectDatabaseChannel = {
  name: 'select-database';
  value?: undefined;
  returnValue: string | undefined;
};

export type ConnectDatabaseChannel = {
  name: 'connect-database';
  value: string;
  returnValue: void;
};

export type GetQuotesChannel = {
  name: 'get-quotes';
  value?: undefined;
  returnValue: Quote[];
};

export type SendChannels = { name: string; value: string };

export type InvokeChannelsWithReturn =
  | SelectDatabaseChannel
  | ConnectDatabaseChannel
  | GetQuotesChannel;

export type InvokeChannels = Omit<InvokeChannelsWithReturn, 'returnValue'>;

export type ReceiveChannels = {
  name: string;
  handler: (...args: unknown[]) => void;
};

export type Api = {
  send: (channel: SendChannels) => void;
  invoke<T extends { name: string; returnValue?: unknown | undefined }>(
    channel: Omit<T, 'returnValue'>
  ): Promise<T['returnValue']>;
  receive: (channel: ReceiveChannels) => void;
};
