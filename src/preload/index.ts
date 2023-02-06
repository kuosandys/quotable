import { contextBridge } from 'electron';
import { CONTEXT_BRIDGE_MAIN_API_KEY } from './constants';
import { createMainApi } from '../main/ipc';

contextBridge.exposeInMainWorld(CONTEXT_BRIDGE_MAIN_API_KEY, createMainApi());
