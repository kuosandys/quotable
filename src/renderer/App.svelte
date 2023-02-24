<script lang="ts">
  import FileSelector from './lib/FileSelector.svelte';
  import Highlights from './lib/Highlights.svelte';
  import { isConnectedToDB } from './stores/stores';
</script>

<main>
  {#if $isConnectedToDB}
    <h1>highlights</h1>
    <Highlights />
  {:else}
    <h1>quotable</h1>
    <FileSelector />
  {/if}
</main>

<style>
</style>
