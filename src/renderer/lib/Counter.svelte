<script lang="ts">
  import { selectDbFile } from '../utils/electronAPI';

  let count: number = 0;
  const increment = () => {
    count += 1;
    selectDbFile('test');
  };
</script>

<button on:click={increment}>
  count is {count}
</button>
