<script>
  import { hexaFlor } from "./func.svelte.js"
  import Control from "./control.svelte"
</script>



<div class="controles">
  {#each hexaFlor.hexDirecciones as hexdir, n (hexdir.id)}
    <Control {hexdir} {n}/>
  {/each}
</div>

<style>
.controles{
  display: flex;
  gap: 8px;
  flex-direction: column;
  width: 580px;
  max-height: 340px;
  overflow: auto;
}
</style>