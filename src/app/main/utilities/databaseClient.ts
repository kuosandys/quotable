import knex, { Knex } from 'knex';
import { KnexBetterSqlite3Config } from '../../db/knexfile';

const TEST_QUERY = 'SELECT CURRENT_TIMESTAMP;';

export type DatabaseClientQuery<U> = (db: Knex) => Promise<U>;

export default class DatabaseClient<T extends {}> {
  private config: KnexBetterSqlite3Config;
  private _filename: string | undefined;
  private _database: Knex<T> | undefined;

  constructor(config: KnexBetterSqlite3Config) {
    this.config = config;
  }

  public async open(filename?: string) {
    if (this._database) {
      await this.close();
    }

    if (filename !== this._filename) {
      this._filename = filename;
    }

    this._database = knex<T>({
      ...this.config,
      connection: { ...this.config.connection, filename: this._filename },
    });

    return this._database;
  }

  public async close(): Promise<void> {
    this._database?.destroy();
  }

  public async execute<U>(query: DatabaseClientQuery<U>): Promise<U> {
    if (!this._database) {
      return this.handleNoDatabaseConnection();
    }

    return query(this._database);
  }

  public async test(): Promise<undefined> {
    if (!this._database) {
      return this.handleNoDatabaseConnection();
    }

    return this._database.raw(TEST_QUERY);
  }

  private handleNoDatabaseConnection() {
    return Promise.reject('No database connection found');
  }
}
