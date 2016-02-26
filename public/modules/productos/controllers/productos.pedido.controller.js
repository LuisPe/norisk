'use strict';

angular.module('productos').controller('PedidoController', ['PedidoService', '$scope', 
	function(PedidoService,$scope){
		$scope.Pedidos = PedidoService.pedido;

		$scope.agregarPedido = function(nombre,cantidad){
			if(PedidoService.existeProducto(nombre)){
				PedidoService.eliminarProducto(nombre);
				PedidoService.agregarProducto(nombre,cantidad);
			} else {
				PedidoService.agregarProducto(nombre,cantidad);
			}
		};

		$scope.editarProducto = function(nombre,cantidad){
			if(cantidad){
	    		PedidoService.editarProducto(nombre,cantidad);
			};
		};

		$scope.eliminarProducto = function(nombre){
			PedidoService.eliminarProducto(nombre);
		};

		$scope.$watch('pedido', function() {
	        PedidoService.pedido = $scope.Pedidos;
	    });

	    $scope.nuevaCantidad = function(pedido,cantidad){
	    	PedidoService.editarProducto(pedido,cantidad);
	    };
	}
]);