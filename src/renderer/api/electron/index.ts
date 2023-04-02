import type * as electronApi from '../../../common/electronApi';

export async function selectDB(): Promise<string | undefined> {
  try {
    return window.electronAPI.invoke<electronApi.SelectImportDBChannel>({
      name: 'select-import-db',
    });
  } catch (e) {
    // TODO: handle
    console.log(e);
    return undefined;
  }
}

export async function importFromDB(fileName: string): Promise<number> {
  try {
    return window.electronAPI.invoke<electronApi.ImportFromDBChannel>({
      name: 'import-from-db',
      value: fileName,
    });
  } catch (e) {
    // TODO: handle
    console.log(e);
    return Promise.reject('Could not connect to database.');
  }
}

export async function getHighlights(): Promise<
  electronApi.Highlight[] | undefined
> {
  try {
    const highlights =
      await window.electronAPI.invoke<electronApi.GetHighlightsChannel>({
        name: 'get-highlights',
      });
    return highlights;
  } catch (e) {
    // TODO: handle
    console.log(e);
    return Promise.reject('Could not load highlights.');
  }
}
