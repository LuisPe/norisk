'use strict';

angular.module('productos').controller('PedidoController', ['PedidoService', '$scope', '$http', '$location',
	function(PedidoService,$scope,$http,$location){
		$scope.Pedidos = PedidoService.pedido;

		$scope.agregarPedido = function(nombre,cantidad){
			if(PedidoService.existeProducto(nombre)){
				PedidoService.eliminarProducto(nombre);
				PedidoService.agregarProducto(nombre,cantidad);
			} else {
				PedidoService.agregarProducto(nombre,cantidad);
			};
			toastr.options = {
			  "closeButton": true,
			  "progressBar": true,
			  "timeOut": "3000",
			  "extendedTimeOut": "1000"
			};
			toastr.success('Pedido agregado');
		};

		$scope.editarProducto = function(nombre,cantidad){
			if(cantidad){
	    		PedidoService.editarProducto(nombre,cantidad);
			}
		};

		$scope.eliminarProducto = function(nombre){
			PedidoService.eliminarProducto(nombre);
		};

		$scope.$watch('pedido', function() {
	        PedidoService.pedido = $scope.Pedidos;
	    });

	    //SEND EMAIL
	    $scope.sendMail = function(){
		    var data = ({
		    	contactoNombre : this.contactoNombre,
		    	contactoEmail : this.contactoEmail,
		    	contactoTelefono : this.contactoTelefono,
		    	pedido : $scope.Pedidos
		    });

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
		    		PedidoService.limpiarPedido();
		    		$location.path('/');
			  }, function errorCallback(response) {
		    		console.log("No se ha enviado el presupuesto");
			  });
		};
	}
]);