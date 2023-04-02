export interface Highlight {
  id: number;
  text: string;
  annotation?: string;
  dateCreated: Date;
  bookId: number;
}

export interface Book {
  id: number;
  title: string;
  author: string;
}

export type SelectImportDBChannel = {
  name: 'select-import-db';
  value?: undefined;
  returnValue: string | undefined;
};

export type ImportFromDBChannel = {
  name: 'import-from-db';
  value: string;
  returnValue: number;
};

export type GetHighlightsChannel = {
  name: 'get-highlights';
  value?: undefined;
  returnValue: Highlight[];
};

export type SendChannels = { name: string; value: string };

export type InvokeChannelsWithReturn =
  | SelectImportDBChannel
  | ImportFromDBChannel
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
