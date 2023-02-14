<script lang="ts">
  import * as electronApi from '../api/electron';

  let selectedFile: string;

  const selectFile = async () => {
    selectedFile = await electronApi.selectDbFile();
  };
</script>

{#if selectedFile !== undefined}
  <p>File selected: {selectedFile}</p>
{:else}
  <button on:click={selectFile}>Select file</button>
{/if}
