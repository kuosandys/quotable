<script lang="ts">
  import * as electronApi from '../api/electron';
  import ErrorMessage from './ErrorMessage.svelte';
</script>

{#await electronApi.getHighlights()}
  <p>loading highlights</p>
{:then highlights}
  <ul>
    {#each highlights as quote}
      <li class="quote-container">
          <p>"{quote.text.trim()}"</p>
      </li>
    {/each}
  </ul>
{:catch error}
  <ErrorMessage {error} />
{/await}

<style>
  li {
    list-style: none;
  }

  .quote-container {
    text-align: left;
    display: flex;
    flex-direction: column;
  }
</style>
