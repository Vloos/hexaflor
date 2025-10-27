<script>
  import BCargaf from "./bCargaf.svelte"
  import BEditf from "./bEditf.svelte"
  import BGuardaf from "./bGuardaf.svelte"
  import BhMax from "./bhMax.svelte"
  import BhMin from "./bhMin.svelte"
  import BNuevo from "./bNuevo.svelte"
  import BOkf from "./bOkf.svelte"
  import { setEditaf, getEditaf, getMinihist, hexaFlor, setMinihist, descargarComoArchivo, procesarArchivo} from "./func.svelte.js"

  let fileInput = $state()


  function archivoCargado(){
    if(fileInput.files[0]) procesarArchivo(fileInput.files[0])
  }
  
</script>

<div class="botonera">
<button onclick="{() => hexaFlor.crearHexdir("Nueva")}" title="Nuevo grupo de direcciones"><BNuevo/></button>
<button onclick="{() => setMinihist(!getMinihist())}" title="{getMinihist() ? 'Ocultar' : 'Mostrar'} historial">
  {#if getMinihist()}
    <BhMin/>
  {:else}
    <BhMax/>
  {/if}
</button>
<button onclick="{() => setEditaf(!getEditaf())}" title="Editar Hexaflor">
  {#if getEditaf()}
    <BOkf/>
  {:else}
    <BEditf/>
  {/if}
</button>
<button onclick="{() => fileInput.click()}" title="Importar"><BCargaf/></button>
<button onclick="{descargarComoArchivo}" title="Exportar"><BGuardaf/></button>
<input type="file" bind:this={fileInput} style="display:none" onchange="{archivoCargado}"/>
</div>

<style>
.botonera{
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 48px;
  position: fixed;
  top: 8px;
  left: 8px;
}

button{
  display: flex;
  gap: 8px;
  height: 48px;
  padding: 4px;
}

</style>