'use strict';

angular.module('productos').controller('PedidoController', ['PedidoService', '$scope', '$http', '$location',
	function(PedidoService,$scope,$http,$location){
		$scope.Pedidos = PedidoService.pedido;

 		// Agrega producto al pedido
		$scope.agregarPedido = function(nombre,cantidad){
			if(PedidoService.existeProducto(nombre)){
				PedidoService.eliminarProducto(nombre);
				PedidoService.agregarProducto(nombre,cantidad);
			} else {
				PedidoService.agregarProducto(nombre,cantidad);
			}
			toastr.options = {
			  "closeButton": true,
			  "progressBar": true,
			  "timeOut": "3000",
			  "extendedTimeOut": "1000"
			};
			toastr.success('Pedido agregado');
		};

 		// Edita producto dentro del pedido
		$scope.editarProducto = function(nombre,cantidad){
			if(cantidad){
	    		PedidoService.editarProducto(nombre,cantidad);
			}
		};

 		// Elimina producto del pedido
		$scope.eliminarProducto = function(nombre){
			PedidoService.eliminarProducto(nombre);
		};

		$scope.$watch('pedido', function() {
	        PedidoService.pedido = $scope.Pedidos;
	    });

	    // Envío de email
	    $scope.sendMail = function(){
		    var data = ({ // Almacena los datos del formulario
		    	contactoNombre : this.contactoNombre,
		    	contactoEmail : this.contactoEmail,
		    	contactoTelefono : this.contactoTelefono,
		    	pedido : $scope.Pedidos
		    });
		    console.log('Enviando Mail');

		    $http({
		    	method:'POST',
		    	url:'/presupuesto',
		    	data: data,
		    }).then(function successCallback(response) {
		    		console.log("Se envió correctamente el presupuesto");
					toastr.options = {
					  "closeButton": true,
					  "progressBar": true,
					  "timeOut": "3000",
					  "extendedTimeOut": "1000"
					};
		    		toastr.success('Pedido enviado');
		    		PedidoService.limpiarPedido(); // Ellimina todos los productos del pedido
		    		$location.path('/'); // Redirección al home
			  }, function errorCallback(response) {
		    		console.log("No se ha enviado el presupuesto");
			  });
		};
	}
]);