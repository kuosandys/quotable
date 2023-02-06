import { Config } from './types';
import * as path from 'path';

export default function createDefaultConfig(): Config {
  return {
    appEntryFilePath: path.join(__dirname, '../index.html'),
    defaultBrowserOptions: {
      width: 800,
      height: 600,
      webPreferences: { preload: path.join(__dirname, 'preload.js') },
    },
  };
}
