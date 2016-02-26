'use strict';

angular.module('productos').service('PedidoService', function(){
	var pedido = this;
	this.pedido = [{'producto':'Algo', 'cantidad':3}];

	this.agregarProducto = function(nombre, cantidad){
		this.pedido.push({'producto':nombre,'cantidad':cantidad}); 
	};

	this.eliminarProducto = function(producto){
		var index = this.pedido.indexOf(producto);
		this.pedido.splice(index,1);
	};

	this.editarProducto = function(producto,cantidad){
		var index = this.pedido.indexOf(producto);
		this.pedido[index] = {'producto':producto,'cantidad':cantidad};
	};

	this.listarProductos = function(){
		return pedido;
	};
	this.existeProducto = function(producto){
		for(var i = 0, len = this.pedido.length; i < len; i++){
			if(this.pedido[i].producto === producto){
				return true;
			}
		}
		return false;
	};
});