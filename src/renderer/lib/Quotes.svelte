<script lang="ts">
  import * as electronApi from '../api/electron';
  import ErrorMessage from './ErrorMessage.svelte';
</script>

{#await electronApi.getQuotes()}
  <p>loading quotes</p>
{:then quotes}
  <ul>
    {#each quotes as quote}
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
