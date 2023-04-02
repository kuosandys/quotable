import { Knex } from 'knex';
import {
  HIGHLIGHT_TABLE,
  HIGHLIGHT_TABLE_NAME,
} from '../../main/models/Highlight';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(HIGHLIGHT_TABLE_NAME, (table) => {
    table.integer(HIGHLIGHT_TABLE.ID);
    table.string(HIGHLIGHT_TABLE.TEXT);
    table.string(HIGHLIGHT_TABLE.ANNOTATION);
    table.date(HIGHLIGHT_TABLE.DATECREATED);
    table.integer(HIGHLIGHT_TABLE.BOOKID);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(HIGHLIGHT_TABLE_NAME);
}
