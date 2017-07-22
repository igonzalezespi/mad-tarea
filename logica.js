angular.module('app', []);

(function () {
angular.module('app')
  .controller('main', main);

  function main() {
    let vm = this;

    vm.encendido = {
      rojo: false,
      amarillo: false,
      verde: false
    };
  }
}());
