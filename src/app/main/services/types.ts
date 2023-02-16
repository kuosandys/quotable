import { Knex } from 'knex';

declare module 'knex/types/tables' {
  interface Bookmark {
    BookmarkID: string;
    Text: string;
    Annotation: string;
    Type: 'highlight' | 'note';
    DateModified: string;
    DateCreated: string;
    VolumeID: string;
  }

  interface Content {
    BookID: string;
    BookTitle: string;
  }

  interface Tables {
    Bookmark: Bookmark;
    Bookmark_composite: Knex.CompositeTableType<Bookmark>;
    content: Content;
    content_composite: Knex.CompositeTableType<Content>;
  }
}
