import type * as electronApi from '../../../common/electronApi';

export async function selectDatabase(): Promise<string | undefined> {
  try {
    return window.electronAPI.invoke<electronApi.SelectDatabaseChannel>({
      name: 'select-database',
    });
  } catch (e) {
    // TODO: handle
    console.log(e);
    return undefined;
  }
}

export async function loadDatabase(fileName: string): Promise<boolean> {
  try {
    await window.electronAPI.invoke<electronApi.ConnectDatabaseChannel>({
      name: 'connect-database',
      value: fileName,
    });
    return true;
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
