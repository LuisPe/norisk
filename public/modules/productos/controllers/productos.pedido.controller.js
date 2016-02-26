'use strict';

angular.module('productos').controller('PedidoController', ['PedidoService', '$scope', 
	function(PedidoService,$scope){
		$scope.Pedidos = PedidoService.pedido;
<<<<<<< HEAD
		//$scope.editar = false;
=======
>>>>>>> a994ea6d3d11b4c9f226075edb923c25c76c9406

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
<<<<<<< HEAD
				PedidoService.eliminarProducto(nombre);
				PedidoService.agregarProducto(nombre,cantidad);
			}
			//$scope.editar = !$scope.editar;
=======
	    		PedidoService.editarProducto(nombre,cantidad);
			};
>>>>>>> a994ea6d3d11b4c9f226075edb923c25c76c9406
		};

		$scope.eliminarProducto = function(nombre){
			PedidoService.eliminarProducto(nombre);
		};

		$scope.$watch('pedido', function() {
	        PedidoService.pedido = $scope.Pedidos;
	    });

<<<<<<< HEAD
	    // $scope.editar = function(){
	    // 	$scope.editar = !$scope.editar;
	    // };

	    $scope.nuevaCantidad = function(pedido){
	    	PedidoService.editarProducto(pedido);
	    	$scope.editar = false;
=======
	    $scope.nuevaCantidad = function(pedido,cantidad){
	    	PedidoService.editarProducto(pedido,cantidad);
>>>>>>> a994ea6d3d11b4c9f226075edb923c25c76c9406
	    };
	}
]);