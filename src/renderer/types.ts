import { ELECTRON_API_KEY } from '../common';
import type * as electronApi from '../common/electronApi';

declare global {
  interface Window {
    [ELECTRON_API_KEY]: electronApi.Api;
  }
}
