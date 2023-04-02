import { Knex } from 'knex';
import { HIGHLIGHT_TABLE_NAME, Highlight } from '../../main/models/Highlight';

const testData: Highlight[] = [
  {
    id: 0,
    text: 'some highlight',
    annotation: 'annotation about the highlight',
    date_created: new Date(),
    book_id: 0,
  },
];

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(HIGHLIGHT_TABLE_NAME).del();

  // Inserts seed entries
  await knex(HIGHLIGHT_TABLE_NAME).insert(testData);
}
