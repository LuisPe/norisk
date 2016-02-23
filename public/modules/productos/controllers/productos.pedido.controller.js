'use strict';

angular.module('productos').factory('Pedido', ['Productos', function(Productos){
	var pedido = [{"producto":"Algo", "cantidad":3}];
	var pedidoService = {};

	pedidoService.agregarProducto = function(nombre, cantidad){
		pedido.push({"producto":nombre,"cantidad":cantidad}); 
	};

	pedidoService.eliminarProducto = function(producto){
		pedido.delete(producto.nombre);
	};

	pedidoService.listarProductos = function(){
		return pedido;
	};

	return pedidoService;
}]);

function listarPedido($scope,Pedido){
	$scope.lista = Pedido.listarProductos;
}

function agregarPedido($scope,Pedido){
	$scope.agregarProducto = Pedido.agregarProducto;
}