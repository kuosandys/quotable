import type * as electronApi from '../../../common/electronApi';

export async function selectDbFile(): Promise<string | undefined> {
  try {
    const file =
      await window.electronAPI.invoke<electronApi.SelectDBFileChannel>({
        name: 'select-db-file',
      });
    return file;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
