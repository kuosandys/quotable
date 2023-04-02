import {
  app,
  App,
  BrowserWindow,
  BrowserWindowConstructorOptions,
} from 'electron';
import { KoboDatabase } from './models/koboDB/KoboDatabase';
import { Config, Env, NodeEnv } from './types';
import DatabaseClient from './utilities/databaseClient';
import dbConfig from '../db/knexfile';
import { QuotableDatabase } from './models/QuotableDatabase';

export default class Main {
  private electronApp: App;
  private appEntryFilePath: string;
  private defaultBrowserOptions: BrowserWindowConstructorOptions;
  private env: Env;
  private currentWindow: BrowserWindow | null = null;
  private koboDatabaseClient: DatabaseClient<KoboDatabase>;
  private quotableDatabaseClient: DatabaseClient<QuotableDatabase>;

  constructor(
    env: Env,
    config: Config,
    electronApp: App = app,
    DBClient = DatabaseClient
  ) {
    this.electronApp = electronApp;
    this.env = env;
    this.appEntryFilePath = config.appEntryFilePath;
    this.defaultBrowserOptions = config.defaultBrowserOptions;
    this.koboDatabaseClient = new DBClient<KoboDatabase>(dbConfig[env.nodeEnv]);
    this.quotableDatabaseClient = new DBClient<QuotableDatabase>(
      dbConfig[env.nodeEnv]
    );
  }

  public async init(
    registerMainHandlers: (
      browserWindow: BrowserWindow,
      koboDatabaseManager: DatabaseClient<KoboDatabase>,
      quotableDatabaseManager: DatabaseClient<QuotableDatabase>
    ) => void,
    ensureQuotableDB: (
      quotableDatabaseManager: DatabaseClient<QuotableDatabase>
    ) => void
  ) {
    try {
      await this.electronApp.whenReady();
      this.createWindow(this.appEntryFilePath);
      this.registerAppHandlers();
      if (this.currentWindow) {
        registerMainHandlers(
          this.currentWindow,
          this.koboDatabaseClient,
          this.quotableDatabaseClient
        );
        await ensureQuotableDB(this.quotableDatabaseClient);
      }
    } catch (e) {
      // TODO: handle
      console.error(e);
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
