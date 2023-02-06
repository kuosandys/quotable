import type { ContextBridgeMainApi } from '../preload/types';
import { CONTEXT_BRIDGE_MAIN_API_KEY } from '../preload/constants';

declare global {
  interface Window {
    [CONTEXT_BRIDGE_MAIN_API_KEY]: ContextBridgeMainApi;
  }
}
