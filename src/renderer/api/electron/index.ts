export function selectDbFile(fileName: string) {
  window.electronAPI.send({ name: 'select-db-file', value: fileName });
}
