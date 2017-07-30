(function () {
  angular.module('app')
    .controller('main', main);

  function main() {
    let $main = this; // Esta variable será el enlace del HTML con el JS.

    // Tomamos cada caja como el conjunto de interruptores horizontales
    let cajaDefecto = [ // En este caso serán 3 y los pondremos apagados por defecto
      false, // 1: Rojo
      false, // 2: Amarillo
      false  // 3: Verde
    ];
    let numCajas = 3; // El número de cajas que hay (verticalmente). Según el enunciado 3, en este caso.

    /* Variaciones con repetición de 2 elementos tomados de 9 en 9 (según enunciado inicial) */

    // El número de interruptores será la multiplicación de líneas verticales por líneas horizontales (matriz)
    let numInterruptores = cajaDefecto.length * numCajas;

    // El número de intentos lo hacemos con la fórmula de Variaciones con repetición. N^M
    // En este caso tomamos como que son 2 elementos [0,1] (encendido/apagado)
    // Las formas posibles son los números de interruptores posibles (3·3=9, según el enunciado)
    let maxIntentos = Math.pow(2, numInterruptores);

    // Construimos los interruptores para que se vean en el HTML
    $main.base = construye(); // Este será el de la izquierda (el que indica el usuario)
    $main.bruto = construye(); // Este el de la derecha (en el que va el resultado)

    // Asignamos las funciones que vayamos a utilizar en el HTML
    $main.toggle = toggle;
    $main.adivina = adivina;

    // Funciones públicas (JS y HTML)

    // Acción que se ejecuta cuando se le da click a un interruptor (enciende o apaga)
    function toggle(caja, interruptor) {
      caja[interruptor] = !caja[interruptor];
    }

    // Acción que se ejecuta cuando se le da click al botón "Adivina"
    // Empieza el sistema de fuerza bruta
    function adivina() {
      /*
       * Las variaciones con repetición las podemos formar conviertiendo
       * cada número, desde cero hasta el máximo número de intentos, a binario.
       * Cada número en binario es una solución.
       * Es decir, si tuviésemos 3 interruptores solo:
       * Tendremos que las posibilidades son 2^3=8
       * Como vamos desde 0, tenemos que quitarle una unidad.
       * Quedaría 7. 7 en binario es "111".
       * Pues todas las soluciones a este ejemplo serían:
       * 111 -> 7 (decimal)
       * 110 -> 6
       * 101 -> 5
       * 100 -> 4
       * 011 -> 3
       * 010 -> 2
       * 001 -> 1
       * 000 -> 0
       *
       * Pues este algoritmo se basa en eso
       * Un bucle desde el máximo número de intentos hasta cero.
       * En cada intento, se convierte el número por donde vamos a binario
       * Ese número en binario (con tamaño fijo) son los ceros y unos de los interruptores
       * Construimos el objeto "bruto" a través de este número binario y comparamos
       */
      let count = 0;
      for (let i = maxIntentos - 1; i >= 0; i--) {
        let actual = decimalToBinary(i, numInterruptores);
        $main.bruto = construyeBruto(actual);
        if (compara($main.base, $main.bruto)) {
          return;
        }
        count++;
      }
    }

    // Funciones privadas (JS)

    // Construye las cajas por defecto
    function construye() {
      let base = [];
      for (let i = 0; i < numCajas; i++) {
        base.push(angular.copy(cajaDefecto));
      }
      return base;
    }

    // Construye las cajas según los intentos de fuerza bruta
    function construyeBruto(cadena) {
      let bruto = [];
      let indice = 0;
      for (let i = 0; i < cadena.length; i = i + cajaDefecto.length) {
        bruto[indice] = [];
        for (let j = 0; j < cajaDefecto.length; j++) {
          bruto[indice].push(Boolean(Number(cadena[i + j])));
        }
        indice++;
      }
      return bruto;
    }

    // Compara la base con cada intento de fuerza bruta
    function compara(a, b) {
      for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a[i].length; j++) {
          if (a[i][j] !== b[i][j]) {
            return false;
          }
        }
      }
      return true;
    }

    // Convierte un número base 2 a base 10
    function binaryToDecimal(num) {
      return parseInt(num, 2);
    }

    // Convierte un número base 10 a base 2
    function decimalToBinary(num, max) {
      if (max) {
        return pad((+num).toString(2), max);
      }
      return (+num).toString(2);
    }

    // Completa el número en base 2, para que sea una cadena de caracteres fija
    function pad(num, tamano) {
      let z = '0';
      num = String(num);
      return num.length >= tamano ? num : new Array(tamano - num.length + 1).join(z) + num;
    }
  }
}());
