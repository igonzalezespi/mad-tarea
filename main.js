(function () {
  angular.module('app')
    .controller('main', main);

  function main() {
    let $main = this;

    let cajaDefecto = {
      rojo: false,
      amarillo: false,
      verde: false
    };

    let numCajas = 3;

    $main.base = construye();
    $main.toggle = toggle;
    $main.bruto = construye();

    //

    function toggle(caja, interruptor) {
      caja[interruptor] = !caja[interruptor];
    }

    function construye() {
      let base = [];
      for (let i = 0; i < numCajas; i++) {
        base.push(angular.copy(cajaDefecto));
      }
      return base;
    }

    function adivina() {
      for () {

      }
    }

    function sonIguales() {

    }
  }
}());
