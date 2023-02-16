import type * as electronApi from '../../../common/electronApi';

export async function selectDatabase(): Promise<string | undefined> {
  try {
    const file =
      await window.electronAPI.invoke<electronApi.SelectDatabaseChannel>({
        name: 'select-database',
      });
    return file;
  } catch (e) {
    // TODO: handle
    console.log(e);
    return undefined;
  }
}

export async function loadDatabase(fileName: string): Promise<void> {
  try {
    const res =
      await window.electronAPI.invoke<electronApi.ConnectDatabaseChannel>({
        name: 'connect-database',
        value: fileName,
      });
    return res;
  } catch (e) {
    // TODO: handle
    console.log(e);
    return undefined;
  }
}
