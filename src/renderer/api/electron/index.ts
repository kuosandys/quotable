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
    return false;
  }
}

export async function getQuotes(): Promise<electronApi.Quote[] | undefined> {
  try {
    return window.electronAPI.invoke<electronApi.GetQuotesChannel>({
      name: 'get-quotes',
    });
  } catch (e) {
    // TODO: handle
    console.log(e);
    return undefined;
  }
}
