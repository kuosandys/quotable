import {
  app,
  App,
  BrowserWindow,
  BrowserWindowConstructorOptions,
} from 'electron';
import { Config, Env, NodeEnv } from './types';

export default class Main {
  private electronApp: App;
  private electronBrowserWindow: typeof BrowserWindow;
  private appEntryFilePath: string;
  private defaultBrowserOptions: BrowserWindowConstructorOptions;
  private env: Env;

  constructor(
    env: Env,
    config: Config,
    electronApp: App = app,
    electronBrowserWindow: typeof BrowserWindow = BrowserWindow
  ) {
    this.electronApp = electronApp;
    this.electronBrowserWindow = electronBrowserWindow;

    this.env = env;
    this.appEntryFilePath = config.appEntryFilePath;
    this.defaultBrowserOptions = config.defaultBrowserOptions;
  }

  public async init(registerMainHandlers: () => void) {
    await this.electronApp.whenReady();
    this.createWindow(this.appEntryFilePath);
    this.registerAppHandlers();
    registerMainHandlers();
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
