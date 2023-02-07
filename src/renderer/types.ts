import { ELECTRON_API_KEY } from '../common/constants';
import type { ElectronApi } from '../common/types';

declare global {
  interface Window {
    [ELECTRON_API_KEY]: ElectronApi;
  }
}
