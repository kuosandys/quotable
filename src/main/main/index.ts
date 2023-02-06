import {
  app,
  App,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  ipcMain,
  IpcMain,
} from 'electron';
import { createMainApiHandlers } from '../ipc';
import { Config, Env, NodeEnv } from '../types';

export default class Main {
  private mainProcess: IpcMain;
  private electronApp: App;
  private electronBrowserWindow: typeof BrowserWindow;
  private appEntryFilePath: string;
  private defaultBrowserOptions: BrowserWindowConstructorOptions;
  private env: Env;

  constructor(
    env: Env,
    config: Config,
    mainProcess: IpcMain = ipcMain,
    electronApp: App = app,
    electronBrowserWindow: typeof BrowserWindow = BrowserWindow
  ) {
    this.mainProcess = mainProcess;
    this.electronApp = electronApp;
    this.electronBrowserWindow = electronBrowserWindow;

    this.env = env;
    this.appEntryFilePath = config.appEntryFilePath;
    this.defaultBrowserOptions = config.defaultBrowserOptions;
  }

  public async init() {
    await this.electronApp.whenReady();
    this.createWindow(this.appEntryFilePath);
    this.registerAppHandlers();
    this.registerMainProcessHandlers();
  }

  private createWindow(
    filePath: string,
    options?: BrowserWindowConstructorOptions
  ) {
    const window = new this.electronBrowserWindow(
      options ?? this.defaultBrowserOptions
    );

    if (this.env.nodeEnv === NodeEnv.DEVELOPMENT) {
      window.loadURL(this.env.rendererDevUrl);
    } else {
      window.loadFile(filePath);
    }
  }

  private registerAppHandlers() {
    this.handleAllWindowsClosed;
  }

  private registerMainProcessHandlers() {
    const handlers = createMainApiHandlers();
    Object.entries(handlers).map(([channel, handler]) =>
      this.mainProcess.on(channel, handler)
    );
  }

  private handleAllWindowsClosed() {
    this.electronApp.on('window-all-closed', () => {
      if (process.platform !== 'darwin') this.electronApp.quit();
    });

    // Mac
    this.electronApp.on('activate', () => {
      if (this.electronBrowserWindow.getAllWindows().length === 0)
        this.createWindow(this.appEntryFilePath);
    });
  }
}
