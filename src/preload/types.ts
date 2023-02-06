export enum MainApiNames {
  SelectDbFile = 'selectDbFile',
}

export type ContextBridgeMainApi = Record<
  MainApiNames,
  (...args: string[]) => void
>;
