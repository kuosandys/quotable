<script lang="ts">
  import * as electronApi from './api/electron';
  import FileSelector from './lib/FileSelector.svelte';

  const loadFile = async (fileName: string) => {
    if (!fileName) return;
    return electronApi.loadDatabase(fileName);
  };
</script>

<main>
  <h1>quotable</h1>

  <FileSelector {loadFile} />
</main>

<style>
</style>
