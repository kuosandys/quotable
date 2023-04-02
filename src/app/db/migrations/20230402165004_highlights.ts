import { Knex } from 'knex';
import {
  HIGHLIGHT_TABLE,
  HIGHLIGHT_TABLE_NAME,
} from '../../main/models/Highlight';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(HIGHLIGHT_TABLE_NAME, (table) => {
    table.increments(HIGHLIGHT_TABLE.ID);
    table.string(HIGHLIGHT_TABLE.TEXT);
    table.string(HIGHLIGHT_TABLE.ANNOTATION);
    table.date(HIGHLIGHT_TABLE.DATE_CREATED);
    table.integer(HIGHLIGHT_TABLE.BOOK_ID);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(HIGHLIGHT_TABLE_NAME);
}
