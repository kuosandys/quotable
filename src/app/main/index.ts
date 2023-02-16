import {
  app,
  App,
  BrowserWindow,
  BrowserWindowConstructorOptions,
} from 'electron';
import { Config, Env, NodeEnv } from './types';
import DatabaseManager from './utilities/databaseManager';

export default class Main {
  private electronApp: App;
  private appEntryFilePath: string;
  private defaultBrowserOptions: BrowserWindowConstructorOptions;
  private env: Env;
  private currentWindow: BrowserWindow | null = null;
  private databaseManager: DatabaseManager;

  constructor(
    env: Env,
    config: Config,
    electronApp: App = app,
    databaseManager = new DatabaseManager()
  ) {
    this.electronApp = electronApp;
    this.env = env;
    this.appEntryFilePath = config.appEntryFilePath;
    this.defaultBrowserOptions = config.defaultBrowserOptions;
    this.databaseManager = databaseManager;
  }

  public async init(
    registerMainHandlers: (
      browserWindow: BrowserWindow,
      databaseManager: DatabaseManager
    ) => void
  ) {
    await this.electronApp.whenReady();
    this.createWindow(this.appEntryFilePath);
    this.registerAppHandlers();
    if (this.currentWindow) {
      registerMainHandlers(this.currentWindow, this.databaseManager);
    }
  }

  private createWindow(
    filePath: string,
    options?: BrowserWindowConstructorOptions
  ) {
    const window = new BrowserWindow(options ?? this.defaultBrowserOptions);

    if (this.env.nodeEnv === NodeEnv.DEVELOPMENT) {
      window.loadURL(this.env.rendererDevUrl);
    } else {
      window.loadFile(filePath);
    }

    this.currentWindow = window;
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
      if (BrowserWindow.getAllWindows().length === 0)
        this.createWindow(this.appEntryFilePath);
    });
  }
}
