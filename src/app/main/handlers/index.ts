import { BrowserWindow } from 'electron';
import registerFileHandlers from './files';

export const registerMainHandlers = (browserWindow: BrowserWindow) => {
  registerFileHandlers(browserWindow);
};
