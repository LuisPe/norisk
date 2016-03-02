'use strict';

angular.module('productos').service('PedidoService', function(){
	var pedido = this;
	this.pedido = [{'producto':'Algo','cantidad':4}];


	this.agregarProducto = function(nombre, cantidad){
		this.pedido.push({'producto':nombre,'cantidad':cantidad}); 
	};

	this.eliminarProducto = function(producto){
		var index = this.pedido.indexOf(producto);
		this.pedido.splice(index,1);
	};

	this.editarProducto = function(producto,cantidad){
		$.each(this.pedido, function() {
		    if (this.producto === producto) {
		        this.cantidad = cantidad;
		    }
		});
	};

	this.limpiarPedido = function(){
		this.pedido = [];
	};

	this.existeProducto = function(producto){
		$.each(this.pedido, function() {
			if(this.producto === producto){
				return true;
			}
		});
		return false;
	};
});