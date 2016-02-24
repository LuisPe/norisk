'use strict';

angular.module('productos').controller('PedidoController', ['PedidoService', '$scope', function(PedidoService,$scope){
	$scope.Pedidos = PedidoService.pedido;
	$scope.editar = false;

	$scope.agregarPedido = function(nombre,cantidad){
		if(PedidoService.existeProducto(nombre)){
			PedidoService.eliminarProducto(nombre);
			PedidoService.agregarProducto(nombre,cantidad);
		} else {
			PedidoService.agregarProducto(nombre,cantidad);
		};
	};

	$scope.$watch('pedido', function() {
        PedidoService.pedido = $scope.Pedidos;
    });

    $scope.editar = function(){
    	$scope.editar = !$scope.editar;
    };
    $scope.nuevaCantidad = function(pedido){
    	PedidoService.editarProducto(pedido);
    	$scope.editar = false;
    }
}]);