(function () {
  angular.module('app')
    .component('interruptor', {
      template: `
        <img ng-src="img/{{$ctrl.color}}-{{$ctrl.encendido ? 'on' : 'off'}}.png"
             ng-click="$ctrl.onToggle()" />
      `,
      bindings: {
        color: '@',
        encendido: '<',
        onToggle: '&'
      }
    });
}());
