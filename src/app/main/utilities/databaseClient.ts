import knex, { Knex } from 'knex';
import { KnexBetterSqlite3Config } from '../../db/knexfile';

const TEST_QUERY = 'SELECT CURRENT_TIMESTAMP;';

export type DatabaseClientQuery<U> = (db: Knex) => Promise<U>;

export default class DatabaseClient<T extends {}> {
  private config: KnexBetterSqlite3Config;
  private database: Knex<T> | undefined;

  constructor(config: KnexBetterSqlite3Config) {
    this.config = config;
  }

  public async open(filename?: string) {
    if (this.database) {
      await this.close();
    }

    if (filename && filename !== this.config.connection.filename) {
      this.config.connection.filename = filename;
    }

    this.database = knex<T>(this.config);

    return this.database;
  }

  public async close(): Promise<void> {
    this.database?.destroy();
  }

  public async execute<U>(query: DatabaseClientQuery<U>): Promise<U> {
    if (!this.database) {
      return this.handleNoDatabaseConnection();
    }

    return query(this.database);
  }

  public async test(): Promise<undefined> {
    if (!this.database) {
      return this.handleNoDatabaseConnection();
    }

    return this.database.raw(TEST_QUERY);
  }

  private handleNoDatabaseConnection() {
    return Promise.reject('No database connection found');
  }
}
