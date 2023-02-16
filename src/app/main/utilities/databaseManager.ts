import knex, { Knex } from 'knex';

const TEST_QUERY = 'SELECT CURRENT_TIMESTAMP;';

interface KnexBetterSqlite3Config extends Knex.Config {
  client: 'better-sqlite3';
  connection: Knex.Sqlite3ConnectionConfig;
}

const defaultBetterSqlite3DbConfig: KnexBetterSqlite3Config = {
  client: 'better-sqlite3',
  connection: {
    filename: ':memory:',
  },
  useNullAsDefault: true,
};

export default class DatabaseManager {
  private config: KnexBetterSqlite3Config;
  private database: Knex | undefined;

  constructor(config: KnexBetterSqlite3Config = defaultBetterSqlite3DbConfig) {
    this.config = config;
  }

  public async open(filename: string) {
    this.database = knex({
      ...this.config,
      connection: { ...this.config.connection, filename },
    });

    // test connection
    const ok = await this.database.raw(TEST_QUERY);
    if (!ok) {
      return Promise.reject('Database connection failed');
    }

    return;
  }

  public async getRows<T extends {}>(tableName: string, filter?: unknown) {
    if (!this.database) {
      return this.handleNoDatabaseConnection();
    }

    const query = this.database<T>(tableName);
    if (filter) {
      query.where(filter);
    }

    return query.select();
  }

  public async getSelect<T extends {}>(
    tableName: string,
    columns: (keyof T)[]
  ) {
    if (!this.database) {
      return this.handleNoDatabaseConnection();
    }

    return this.database.select(...columns).from<T>(tableName);
  }

  public async close(): Promise<void> {
    this.database?.destroy();
  }

  private handleNoDatabaseConnection() {
    return Promise.reject('No database connection found');
  }
}
