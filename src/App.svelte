<script>
	import Historia from './lib/historia.svelte';
	import Botonera from './lib/botonera.svelte';
  import Controles from './lib/controles.svelte'
  import Hexaflor from './lib/hexaFlor.svelte'
  import Lista from './lib/Lista.svelte'
  import { hexaFlor } from './lib/func.svelte'
  import Favicon from './lib/favicon.svelte'
</script>
<svelte:head>
  <title>{hexaFlor.nombre}</title>
</svelte:head>

<Favicon/>
<main>
  <Botonera/>
  <div class="card">
    <Hexaflor />
    <Lista/>
    <Controles/>
    <Historia/>
  </div>
</main>

