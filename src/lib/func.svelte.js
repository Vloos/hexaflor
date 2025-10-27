let hexActivo = $state(1) //hex activo en cada momento
let historia = $state([])
let hexesDirecciones = $state([]) //colección de hexágonos de direcciones, por si se usan varios a la vez.
let resTirada = $state(0)
let ultimoMovOri = $state('Inicial')
let minihist = $state(false)
let editaf = $state(false)

export const getMinihist = () => minihist
export const setMinihist = (v) => { minihist = v }
export const getEditaf = () => editaf
export const setEditaf = (v) => { editaf = v }
export const getHexActivo = () => hexActivo
export const getResTirada = () => resTirada
export const getHistoria = () => historia
export const getUlMovOri = () => ultimoMovOri
export const setUlMovOri = (v) => { ultimoMovOri = v }

export const quitarHexdir = (n) => {
  direccionesColeccion.splice(n, 1)
}

class Hexaflor {
  constructor() {
    this.r = [[0, 0, 0, 0, 0, 0], [1, 2, 3, 4, 5, 6, 7], [2, 8, 9, 3, 1, 7, 19], [3, 9, 10, 11, 4, 1, 2], [4, 3, 11, 12, 13, 5, 1], [5, 1, 4, 13, 14, 15, 6], [6, 7, 1, 5, 15, 16, 17], [7, 19, 2, 1, 6, 17, 18], [8, 14, 18, 9, 2, 19, 10], [9, 13, 17, 10, 3, 2, 8], [10, 12, 16, 8, 11, 3, 9], [11, 10, 15, 19, 12, 4, 3], [12, 11, 14, 18, 10, 13, 4], [13, 4, 12, 17, 9, 14, 5], [14, 5, 13, 16, 8, 12, 15], [15, 6, 5, 14, 19, 11, 16], [16, 17, 6, 15, 18, 10, 14], [17, 18, 7, 6, 16, 9, 13], [18, 16, 19, 7, 17, 8, 12], [19, 15, 8, 2, 7, 18, 11]]
    this.iniHex = 1
    this.nombre = $state('Hexaflor')
    this.bloqueos = $state([[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]])
    this.hexDirecciones = $state([])
    this.funciones = $state(['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',])   // que cosa, en el juego, equivale cada valor.
  }

  getBloqueos() {
    return this.bloqueos
  }

  quitarPonerBarrera(hex, dir) {
    this.bloqueos[hex][dir] = this.bloqueos[hex][dir] == 0 ? 1 : 0
  }

  crearHexdir(nombre, direcciones) {
    let hdir = new HexDirecciones(nombre, direcciones)
    this.hexDirecciones.push(hdir)
  }

  quitarHexdir(cual) {
    this.hexDirecciones.splice(cual, 1)
  }

  alLiteral() {
    let l = {}
    l.n = this.nombre
    l.b = [...$state.snapshot(this.bloqueos)]
    l.f = [...this.funciones]
    l.d = []
    this.hexDirecciones.forEach(h => l.d.push(h.alLiteral()))
    return l
  }

  desdeLiteral(obj){
    this.nombre = obj.n
    this.bloqueos = obj.b
    this.funciones = obj.f
    let d = []
    obj.d.forEach((objD) => {
      let direccion = new HexDirecciones(objD.nombre, objD.direcciones)
      d.push(direccion)
    })
    this.hexDirecciones = d
  }
}


class HexDirecciones {
  /**
   * Un hexágono de direcciones
   * @param nombre nombre del hexágono
   * @param direcciones array de 13. los índices corresponden a cada resultado de la tirada de 2d6 y los valores corresponden a la dirección a la que se mueve, empezando con 1 para ir hacia arriba, y cada dirección siguiente en sentido horario tiene el valor 2, 3, etc. Así que posición 0 y posición 1 a 0. Por ejemplo: posición 2 = 3 para mover hacia abajo-derecha cuando sale 2 en la tirada.
   */
  constructor(nombre, direcciones = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) {
    this.id = generateUID()
    this.nombre = $state(nombre)
    this.direcciones = direcciones
    this.rest = $state(0)   // resultado de la tirada de dados
  }

  alLiteral() {
    let l = {}
    l.nombre = this.nombre
    l.direcciones = [...this.direcciones]
    return l
  }
}



/**
 * @returns tirada de 2d6
 */
function tirada() {
  let d1 = Math.floor(Math.random() * (6) + 1)
  let d2 = Math.floor(Math.random() * (6) + 1)
  return d1 + d2
}


export function tirar(control) {
  let res = tirada()
  let dir = control.direcciones[res]
  let nuevoHexAct = hexaFlor.r[getHexActivo()][hexaFlor.getBloqueos()[getHexActivo()][dir] ? 0 : dir]
  setHexActivo(nuevoHexAct)
  control.rest = res
}

export function setHexActivo(n) {
  hexActivo = n
  historia.push([ultimoMovOri, hexActivo, hexaFlor.funciones[hexActivo]])
}


function generateUID() {
  // I generate the UID from two parts here 
  // to ensure the random number provide enough bits.
  var firstPart = (Math.random() * 46656) | 0;
  var secondPart = (Math.random() * 46656) | 0;
  firstPart = ("000" + firstPart.toString(36)).slice(-3);
  secondPart = ("000" + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
}



//importa y exporta
function exporta() {
  let algo = JSON.stringify(hexaFlor.alLiteral())
  let base = btoa(algo)
  return base
}


export function descargarComoArchivo() {
  const blob = new Blob([exporta()], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url;
  a.download = nombreArchivo(hexaFlor.nombre)
  a.click();

  URL.revokeObjectURL(url);
}


function nombreArchivo(filename) {
  let sanitized = filename.replace(/[\\/:*?"<>|]/g, '');
  sanitized = sanitized.trim();
  sanitized = sanitized.replace(/\s+/g, ' ');
  const MAX_LENGTH = 255;

  if (!sanitized || sanitized === '.' || sanitized === '..') {
    return 'Hexaflor';
  }

  if (sanitized.length > MAX_LENGTH) {
    sanitized = sanitized.substring(0, MAX_LENGTH);
  }

  return sanitized;
}


function decodificarYParsear(base64Data) {
  let jsonString;
  try {
    jsonString = atob(base64Data);
  } catch (e) {
    throw new Error("Formato Base64 inválido.");
  }

  // parseo de json
  let objeto;
  try {
    objeto = JSON.parse(jsonString);
  } catch (e) {
    throw new Error("El texto decodificado no es un JSON válido.");
  }

  return objeto;
}


export function procesarArchivo(file) {
  if (!file) return;
  
  const reader = new FileReader();
  
  reader.onload = (e) => {
    const base64Text = e.target.result;
    
    try {
      const objetoDecodificado = decodificarYParsear(base64Text);
      
      if(deepCheck(objetoDecodificado, modelo)){
        console.log("Archivo validado.", objetoDecodificado);
        // hacer cosas
        hexaFlor.desdeLiteral(objetoDecodificado)
      } else {
        console.error("El esquema del objeto no es el esperado.");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // Lee el contenido del archivo como texto
  reader.readAsText(file);
}


function deepCheck(obj, model) {
  for (const key in model) {
    const expectedType = typeof model[key]

    if (typeof obj[key] !== expectedType) return false
    
    // Si es un objeto, hacer comprobación recursiva
    if (expectedType === 'object' && model[key] !== null) {
      if (!deepCheck(obj[key], model[key])) return false
    }
  }
  return true;
}





//echar esto a andar
export let hexaFlor = new Hexaflor()
hexaFlor.crearHexdir('Predeterminado', [0, 0, 1, 2, 2, 3, 3, 4, 5, 5, 6, 6, 1])
setHexActivo(hexaFlor.iniHex)
let modelo = hexaFlor.alLiteral()
