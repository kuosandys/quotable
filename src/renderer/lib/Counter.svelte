<script lang="ts">
  import * as electronApi from '../api/electron';

  let count: number = 0;
  const increment = () => {
    count += 1;
    electronApi.selectDbFile('test');
  };
</script>

<button on:click={increment}>
  count is {count}
</button>
