export function selectDbFile(fileName: string) {
  window.electronAPI.send('select-db-file', fileName);
}
