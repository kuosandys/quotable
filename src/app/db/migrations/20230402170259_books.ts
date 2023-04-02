import { Knex } from 'knex';
import { BOOK_TABLE, BOOK_TABLE_NAME } from '../../main/models/Book';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(BOOK_TABLE_NAME, (table) => {
    table.integer(BOOK_TABLE.ID);
    table.string(BOOK_TABLE.TITLE);
    table.string(BOOK_TABLE.AUTHOR);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(BOOK_TABLE_NAME);
}
