'use strict';

angular.module('productos').controller('PedidoController', ['PedidoService', '$scope', '$http',
	function(PedidoService,$scope,$http){
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
			};
		};

		$scope.eliminarProducto = function(nombre){
			PedidoService.eliminarProducto(nombre);
		};

		$scope.$watch('pedido', function() {
	        PedidoService.pedido = $scope.Pedidos;
	    });

	    //SEND EMAIL
	    this.sendMail = function(){
	    	console.log(this.contactoNombre + this.contactoEmail + this.contactoTelefono);
		    var data = ({
		    	contactoNombre : this.contactoNombre,
		    	contactoEmail : this.contactoEmail,
		    	contactoTelefono : this.contactoTelefono,
		    	pedido : $scope.Pedidos
		    });

		    $http.post('/presupuesto', data)
		    	.success(function(data, status, headers, config){
		    		console.log("Se mando Julian");
		    	})
		    	.error(function(data, status, headers, config){
		    		console.log("No se mando ni mierda");
		    	});
		    };
		}
]);