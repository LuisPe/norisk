'use strict';

angular.module('productos').directive('producto',function(){ // Directiva de Producto en pedido
	return{
		restrict: 'E',
		templateUrl: 'modules/productos/directives/producto.html'
	};
});