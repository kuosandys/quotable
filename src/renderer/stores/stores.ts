import { writable } from 'svelte/store';

export enum Views {
  HIGHLIGHTS = 'highlights',
  IMPORT = 'import',
}

export const currentView = writable<Views>(Views.HIGHLIGHTS);
