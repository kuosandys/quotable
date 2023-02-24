export interface Highlight {
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

export type GetHighlightsChannel = {
  name: 'get-highlights';
  value?: undefined;
  returnValue: Highlight[];
};

export type SendChannels = { name: string; value: string };

export type InvokeChannelsWithReturn =
  | SelectDatabaseChannel
  | ConnectDatabaseChannel
  | GetHighlightsChannel;

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
