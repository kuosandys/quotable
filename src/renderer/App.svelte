<script lang="ts">
  import * as electronApi from './api/electron';
  import FileSelector from './lib/FileSelector.svelte';
  import Quotes from './lib/Quotes.svelte';
  import { isConnectedToDB } from './stores/stores';

  const loadFile = async (fileName: string) => {
    if (!fileName) return;
    const res = await electronApi.loadDatabase(fileName);
    isConnectedToDB.set(res);
  };
</script>

<main>
  {#if $isConnectedToDB}
    <h1>quotes</h1>
    <Quotes />
  {:else}
    <h1>quotable</h1>

    <FileSelector {loadFile} />
  {/if}
</main>

<style>
</style>
