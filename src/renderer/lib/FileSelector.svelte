<script lang="ts">
  import * as electronApi from '../api/electron';
  import ErrorMessage from './ErrorMessage.svelte';
  import { isConnectedToDB } from '../stores/stores';

  let selectedFile: string | undefined;
  let fileLoadError: unknown;
  
  const selectFile = async () => {
    selectedFile = await electronApi.selectDatabase();
  };

  const handleLoadFile = async () => {
    const res = await electronApi.loadDatabase(selectedFile);
    isConnectedToDB.set(res);
  }
</script>

{#if selectedFile !== undefined}
  <p>File selected: {selectedFile}</p>
  <button on:click={handleLoadFile}>Load file</button>
{:else}
  {#if fileLoadError}
    <ErrorMessage error={fileLoadError} />
  {/if}
  <button on:click={selectFile}>Select file</button>
{/if}
