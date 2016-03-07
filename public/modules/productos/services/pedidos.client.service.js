'use strict';

// Servicio de pedido para presupuestar
angular.module('productos').service('PedidoService', function(){
	var pedido = this;
	this.pedido = [{'producto':'Producto1','cantidad':1},{'producto':'Producto2','cantidad':2},{'producto':'Producto3','cantidad':2},{'producto':'Producto4','cantidad':2},{'producto':'Producto5','cantidad':2},{'producto':'Producto6','cantidad':2}]; // Productos de testeo

	// Agrega producto al pedido
	this.agregarProducto = function(nombre, cantidad){
		this.pedido.push({'producto':nombre,'cantidad':cantidad}); 
	};

	// Elimina producto del pedido
	this.eliminarProducto = function(producto){
		for (var i in this.pedido){
			if (this.pedido[i].producto === producto){
				console.log(i);
				this.pedido.splice(i,1);
			}
		}
	};

	// Edita cantidad en producto del pedido
	this.editarProducto = function(producto,cantidad){
		$.each(this.pedido, function() {
		    if (this.producto === producto) {
		        this.cantidad = cantidad;
		    }
		});
	};

	// Elimina todo producto del pedido
	this.limpiarPedido = function(){
		this.pedido = [];
	};

	// Consulta la existencia de producto en el pedido
	this.existeProducto = function(producto){
		$.each(this.pedido, function() {
			if(this.producto === producto){
				return true;
			}
		});
		return false;
	};
});