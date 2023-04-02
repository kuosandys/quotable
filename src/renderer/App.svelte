<script lang="ts">
  import FileSelector from './lib/FileSelector.svelte';
  import Highlights from './lib/Highlights.svelte';
  import { currentView, Views } from './stores/stores';
</script>

<main>
  {#if $currentView === Views.HIGHLIGHTS}
    <h1>quotable</h1>
    <button on:click={() => currentView.set(Views.IMPORT)}
      >import highlights</button
    >
    <Highlights />
  {:else if $currentView === Views.IMPORT}
    <h1>import highlights</h1>
    <FileSelector />
  {/if}
</main>

<style>
</style>
