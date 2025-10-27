<script>
	import Lista from './Lista.svelte';
  import { hexaFlor, getHexActivo, setHexActivo } from './func.svelte.js';
  import { getEditaf } from './func.svelte.js';

  let elementos = $state([])
  let enfoque = $state(0)

  function manejaTecla(e){
    
    if(e.key == 'Enter'){
      elementos[enfoque + 1 == 19 ? 0 : enfoque + 1].focus()
    }
  }

</script>


<div class="lista" class:mini={getEditaf()}>
  {#if !getEditaf()}
    <h3 class="actual">{hexaFlor.funciones[getHexActivo()] || ' '}</h3>
  {:else}
    <div class="efectos">
      {#each {length: 19}, n}
        <div class="efecto">
          <h4>{n+1} : </h4><input type="text" bind:value={hexaFlor.funciones[n+1]} bind:this={elementos[n]} onkeydown="{manejaTecla}" onfocus="{() => {enfoque = n}}">
        </div>
      {/each}  
    </div>
  {/if}
</div>


<style>
  .lista{
    min-height: 45px;
  }
  .efectos{
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  input{
    flex-grow: 1;
  }

  h3{
    margin: 8px 0;
  }
  
  h4{
    padding: 0;
    margin: 0;
    flex-basis: 50px;
  }

  .efecto{
    background-color: transparent;
    height: 32px;
    display: flex;
    place-items: center;
    gap: 8px;
  }
</style>