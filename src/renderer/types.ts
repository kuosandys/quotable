import { ELECTRON_API_KEY, type ElectronApi } from '../common';

declare global {
  interface Window {
    [ELECTRON_API_KEY]: ElectronApi;
  }
}
