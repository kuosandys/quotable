import { Knex } from 'knex';
import { Book, BOOK_TABLE_NAME } from '../../main/models/Book';

const testData: Book[] = [
  { id: 0, title: 'some title', author: 'some author' },
];

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(BOOK_TABLE_NAME).del();

  // Inserts seed entries
  await knex(BOOK_TABLE_NAME).insert(testData);
}
