import { ipcMain } from 'electron';
import { ElectronApiChannelHandler } from './types';

export default () => {
  const sendChannels: ElectronApiChannelHandler[] = [
    {
      name: 'select-db-file',
      handler: (_event, value) => console.log(value),
    },
  ];

  sendChannels.forEach(({ name, handler }) => ipcMain.on(name, handler));
};
