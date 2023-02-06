import { BrowserWindowConstructorOptions } from 'electron';

export interface Config {
  appEntryFilePath: string;
  defaultBrowserOptions: BrowserWindowConstructorOptions;
}

export enum NodeEnv {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

export interface Env {
  nodeEnv: NodeEnv | string;
  rendererDevUrl: string;
}
