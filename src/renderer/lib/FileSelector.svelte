<script lang="ts">
  import * as electronApi from '../api/electron';
  import ErrorMessage from './ErrorMessage.svelte';
  import { currentView, Views } from '../stores/stores';

  let selectedFile: string | undefined;
  let importError: unknown;
  let importStatus: string | undefined;

  const selectFile = async () => {
    selectedFile = await electronApi.selectDB();
  };

  const handleLoadFile = async () => {
    try {
      importStatus = 'importing highlights...';
      const highlightsCount = await electronApi.importFromDB(selectedFile);
      importStatus = `${highlightsCount} highlights imported`;
      setTimeout(() => currentView.set(Views.HIGHLIGHTS), 1000); // TODO: replace with something more elegant
    } catch (err) {
      importStatus = undefined;
      importError = err;
    }
  };
</script>

{#if selectedFile !== undefined}
  <p>File selected: {selectedFile}</p>
  <button on:click={handleLoadFile}>import</button>
{:else}
  {#if importError}
    <ErrorMessage error={importError} />
  {/if}
  {#if importStatus}
    <p>{importStatus}</p>
  {/if}
  <button on:click={selectFile}>select file</button>
{/if}
