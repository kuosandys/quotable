<script lang="ts">
  import * as electronApi from '../api/electron';

  let selectedFile: string | undefined;

  const selectFile = async () => {
    selectedFile = await electronApi.selectDatabase();
  };

  export let loadFile: (fileName: string) => void;
</script>

{#if selectedFile !== undefined}
  <p>File selected: {selectedFile}</p>
  <button on:click={() => loadFile(selectedFile)}>Load file</button>
{:else}
  <button on:click={selectFile}>Select file</button>
{/if}
