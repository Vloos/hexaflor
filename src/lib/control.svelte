<script>
	import BAmpli from './bAmpli.svelte';
  import { tirar, hexaFlor, setUlMovOri } from "./func.svelte.js"
  import Bedita from "./bEdita.svelte";
  import BQuita from "./bQuita.svelte"
  import { onMount } from 'svelte';
  import BOk from "./bOk.svelte"
  import BCancela from "./bCancela.svelte"
  import BMini from "./bMini.svelte"
  import { slide, fade } from 'svelte/transition'


  let controlE = $state()
  let { hexdir, n } = $props();
  let borrando = $state(false)
  let editando = $state(false)
  let mini = $state(false)
  let valoresDisponibles = $state([0,0,1,1,1,1,1,1,1,1,1,1,1])
  let viejoN    // nombre de antes de ponerse a editar
  let viejoD    // direcciones de antes de ponerse a editar
  let resultadosPorDireccion = $state([])



 	onMount(() => {
    repartirValoresPorDireccion()
    //empieza editando si todas las direcciones van hacia 0 (hacia si mismo, lo que viene siendo un hexágono de direcciones nuevo)
    if(hexdir.direcciones.every(e => e === 0)){
      clickEditar()
    } else{
      mini = true
    } 
	});


  function manejaClick(){
    setUlMovOri(hexdir.nombre)
    if(!editando)tirar(hexdir)
  }


  function hadlekey(e) {
    // Si se presiona Enter o Espacio
    if (e.key === 'Enter' || e.key === ' ') {
      // Prevenir el comportamiento por defecto (por ejemplo, para evitar que se envíe un formulario si el botón está en uno)
      e.preventDefault();
      // Llamar a tu función para manejar el evento
      manejaClick();
    }
  }


  function repartirValoresPorDireccion(){
    let rpd = [] // resultados por dirección
    let vd = [0,0,1,1,1,1,1,1,1,1,1,1,1]
    hexdir.direcciones.forEach((e, i) => {
      if(!rpd[e]) rpd[e] = []
      rpd[e] = [...rpd[e], i]
      vd[i] = i >= 2 && e == 0 ? 1 : 0  // poner en la lista los valores que no se han puesto en alguna dirección
    });
    valoresDisponibles = vd
    resultadosPorDireccion = [...rpd]
  }

  $effect(()=>{
    if(editando && !mini) controlE.scrollIntoView({behavior: 'smooth'});
  })


  //cosas para repartición de valores para direcciones cuando edita:
  function clickEditar(){
    editando = !editando
    viejoN = hexdir.nombre
    viejoD = [...hexdir.direcciones]
    repartirValoresPorDireccion()    
  }


  function meteDireccion(cual, donde){
    hexdir.direcciones[cual] = donde
    repartirValoresPorDireccion()
  }


  function hkeyMeteDireccion(e, cual, donde){
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      meteDireccion(cual, donde);
    }
  }


  function quitaDireccion(cual){
    hexdir.direcciones[cual] = 0
    repartirValoresPorDireccion()
  }


  function hkeyQuitaDireccion(e, cual){
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      meteDireccion(cual);
    }
  }


  function deshacer(){
    editando = false
    hexdir.nombre = viejoN
    hexdir.direcciones = viejoD
    repartirValoresPorDireccion()
  }


  function cancelar(){
    if(borrando){
      borrando = false
      return
    } 
    if(!borrando && !editando) borrando = true
    if(editando) deshacer()
  }
</script>


<div class="control" class:mini={mini} bind:this={controlE} transition:fade={{duration:250}}>
  <div class="barratitulos">
    <div class="titulos" onclick="{() =>  mini ? manejaClick() : null}" role=button tabindex="0" onkeypress="{hadlekey}">
      {#if editando}
      <input class:editando={editando} type="text" name="nombre" id="nombre" bind:value={hexdir.nombre}>
      {:else}
      <h2>{borrando ? `¿Borrar ${hexdir.nombre}?`: hexdir.nombre}</h2>
      {/if}
      {#if mini && !editando}
        <h3>{hexdir.rest}</h3>
      {/if}
    </div>
    <button onclick="{() => mini = !mini}">
      {#if mini}
        <BAmpli/>
      {:else}
        <BMini/>
      {/if}
    </button>
    <button class="bEdita" onclick="{() => borrando ? hexaFlor.quitarHexdir(n) : clickEditar()}">
      <span>{#if editando || borrando}
          <BOk/>
        {:else}
          <Bedita/>
        {/if}
      </span>
    </button>
    <button class="bQuita" onclick="{() => cancelar()}">
      {#if borrando || editando}
        <BCancela/>
      {:else}
        <BQuita/>
      {/if}
    </button>
  </div>
  {#if !mini}
    <div class="caja" transition:slide={{axis:'y', duration:250}}>
      <div class="hexa">
        <svg width="100%" height="100%" viewBox="0 0 315 274" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
          <g transform="matrix(1,0,0,1,-12689.3,-3848.69)">
            <g transform="matrix(1,0,0,1,5.90551,-10.2286)">
              <path class:editando onclick="{manejaClick}" onkeypress="{hadlekey}" role="button" tabindex="-2" d="M12767.7,4132.37L12921.3,4132.37L12998,3999.4L12921.3,3866.43L12767.7,3866.43L12690.9,3999.4L12767.7,4132.37Z" style="fill:white;fill-opacity:0.35;"/>
              <path d="M12767.7,4132.37L12921.3,4132.37L12998,3999.4L12921.3,3866.43L12767.7,3866.43L12690.9,3999.4L12767.7,4132.37ZM12772.5,4124.04L12700.6,3999.4C12700.6,3999.4 12772.5,3874.76 12772.5,3874.76C12772.5,3874.76 12890.9,3874.76 12916.4,3874.76C12916.4,3874.76 12975.6,3977.3 12988.4,3999.4C12988.4,3999.4 12916.4,4124.04 12916.4,4124.04C12916.4,4124.04 12772.5,4124.04 12772.5,4124.04L12772.5,4124.04Z" style="fill:rgb(21,21,21);"/>
            </g>
          </g>
        </svg>
      </div>
      <div class="d1" class:dirs={editando}>
        {@render direccionValores(1)}
      </div>
      <div class="d2" class:dirs={editando}>
        {@render direccionValores(2)}
      </div>
      <div class="d3" class:dirs={editando}>
        {@render direccionValores(3)}
      </div>
      <div class="d4" class:dirs={editando}>
        {@render direccionValores(4)}
      </div>
      <div class="d5" class:dirs={editando}>
        {@render direccionValores(5)}
      </div>
      <div class="d6" class:dirs={editando}>
        {@render direccionValores(6)}
      </div>
      <div class="rest">
        {editando ? '' : hexdir.rest}
      </div>
    </div>
  {/if}
</div>

{#snippet direccionValores(dir)}
    {#if editando}
      <div>
        {#each valoresDisponibles as d, v}
          {#if d}
            <span onclick="{() => meteDireccion(v, dir)}" onkeypress="{(e) => hkeyMeteDireccion(e, v, dir)}" class="metible" role="button" tabindex="-3">{v}</span>
          {/if}
        {/each}
      </div>
      <div>
        {#each resultadosPorDireccion[dir] as v}
          <span onclick="{() => quitaDireccion(v)}" onkeypress="{(e) => hkeyQuitaDireccion(e, v)}" class="valdir quitable" role="button" tabindex="-4">{v}</span> 
        {/each}
      </div>
    {:else}
      <div>
        {#each resultadosPorDireccion[dir] as v}
          <span class="valdir">{v}</span> 
        {/each}
      </div>
    {/if}
{/snippet}


<style>

  .control{
    border: 1px solid rgb(84, 84, 84);
    padding: 8px;
  }

  .barratitulos{
    display: grid;
    grid-template-columns: auto repeat(3, 48px);
    gap: 4px;
  }

  .titulos{
    height: 100%;
    display: grid;
    grid-column: 1 / 2;
    grid-template-columns: subgrid;
  }

  .mini .titulos{
    grid-column: 1 / 2;
    grid-template-columns: auto 48px;
  }

  .mini .barratitulos{
    grid-template-columns: auto repeat(3, 48px);
  }

  h2, h3{
    margin: 0;
    padding: 0;    
    display: grid;
    grid-template-columns: auto;
    align-items: center;
    user-select: none;
  }
  
  h2{
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  input.editando{
    grid-column: 1 / 3;
  }

  .mini h2, .mini h3{
    cursor: pointer;
  }

  button{
    display: flex;
    height: 48px;
    padding: 4px;
  }

  .caja{
    display: grid;
    grid-template-columns: 1fr 130px 1fr;
    grid-template-rows: 48px 48px 65px 48px 48px;
    margin-top: 4px;
  }

  .hexa{
    grid-column: 1 / 4;
    grid-row: 1 / 6;
    place-content: center;
    padding: 55px;
  }

  .hexa path:not(.editando){
    cursor: pointer;
  }

  .rest{
    grid-column: 2 / 3;
    grid-row: 2 / 5;
    place-content: center;
    text-align: center;
    pointer-events: none;
    user-select: none;
    font-size: 4em;
    font-weight: bold;
    min-width: 100px;
  }

  .dirs{
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 1fr);
  }

  .d1{
    grid-column: 1 / 4;
    grid-row: 1;
    place-content: end center;
  }
  
  .d2{
    grid-column: 3;
    grid-row: 2;
    place-content: end;
    text-align: left;
  }

  .d3{
    grid-column: 3;
    grid-row: 4;
    place-content: start;
    text-align: left;
  }

  .d4{
    grid-column: 1 / 4;
    grid-row: 5;
  }

  .d5{
    grid-column: 1;
    grid-row: 4;
    place-content: start;
    text-align: right;
  }

  .d6{
    grid-column: 1;
    grid-row: 2;
    place-content: end;
    text-align: right;
  }

  .d1 div:first-child, .d2 div:first-child, .d6 div:first-child{
    grid-row: 1/2;
  }

  .d3 div:first-child, .d4 div:first-child, .d5 div:first-child{
    grid-row: 2/3;
  } 

  .valdir{
    padding: 0 4px;
    font-weight: bold;
  }

  .metible{
    padding: 0 4px;
    margin: 0;
    cursor: pointer;
    user-select: none;
  }

  .metible:hover, .quitable:hover{
    font-weight: bold;
    text-decoration: underline;
  }

  .quitable{
    cursor: pointer;
  }
</style>