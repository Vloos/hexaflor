<script>
	import { getHistoria, getMinihist } from './func.svelte.js';

</script>

{#if getMinihist()}
  <div class="historia">

    {#each getHistoria() as m}
      <div class="movimiento"><span>{m[0]}</span><span>{m[1]}</span><span>{m[2]}</span></div>
    {/each}
  </div>
{/if}

<style>
  .historia{
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 25vh;
    overflow: auto;
    border: 1px solid rgb(84, 84, 84);
  }
  .movimiento{
    display: flex;
    gap: 8px;
  }

  span{
    padding: 4px;
    flex-basis: 33%;
  }
</style>
