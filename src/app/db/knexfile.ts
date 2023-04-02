import type { Knex } from 'knex';
import path from 'path';
import { NodeEnv } from '../main/types';

export interface KnexBetterSqlite3Config extends Knex.Config {
  client: 'better-sqlite3';
  connection: Knex.Sqlite3ConnectionConfig;
}

const defaultBetterSqlite3DbConfig: Record<NodeEnv, KnexBetterSqlite3Config> = {
  [NodeEnv.DEVELOPMENT]: {
    client: 'better-sqlite3',
    connection: {
      filename: path.join(__dirname, '../testDB.sqlite3'),
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, './migrations'),
    },
    useNullAsDefault: true,
  },
  [NodeEnv.PRODUCTION]: {
    client: 'better-sqlite3',
    connection: {
      filename: path.join(__dirname, '../db.sqlite3'),
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, './migrations'),
    },
    useNullAsDefault: true,
  },
};

export default defaultBetterSqlite3DbConfig;
