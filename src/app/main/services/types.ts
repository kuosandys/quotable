import { Knex } from 'knex';
import { Bookmark, Content } from '../../../common/electronApi';

declare module 'knex/types/tables' {
  interface Tables {
    Bookmark: Bookmark;
    Bookmark_composite: Knex.CompositeTableType<Bookmark>;
    content: Content;
    content_composite: Knex.CompositeTableType<Content>;
  }
}
