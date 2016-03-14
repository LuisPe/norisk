'use strict';

// Empresas controller
angular.module('empresas').controller('EmpresasController', ['$scope', '$stateParams', '$location', 'Authentication', 'Empresas', '$http',
	function($scope, $stateParams, $location, Authentication, Empresas, $http) {
		$scope.authentication = Authentication;
	  	$scope.currentPage = 1;
	  	$scope.pageSize = 10;
	  	$scope.offset = 0;

	  	// Controlador de cambio de página
	  	$scope.pageChanged = function() {
	   		$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
	  	};

		// Crea nueva empresa
		$scope.create = function() {
			var empresa = new Empresas ({
				nombre: this.nombre,
				descripcion: this.descripcion,
				eslogan: this.eslogan
			});

			// Redirecciona luego de guardar
			empresa.$save(function(response) {
				$location.path('empresas/' + response._id);

				// Limpia los campos
				$scope.nombre = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Elimina empresa existente
		$scope.remove = function(empresa) {
			if ( empresa ) { 
				empresa.$remove();

				for (var i in $scope.empresas) {
					if ($scope.empresas [i] === empresa) {
						$scope.empresas.splice(i, 1);
					}
				}
			} else {
				$scope.empresa.$remove(function() {
					$location.path('empresas');
				});
			}
		};

		// Actualiza empresa existente
		$scope.update = function() {
			var empresa = $scope.empresa;

			empresa.$update(function() {
				$location.path('la-empresa');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Lista empresas
		$scope.find = function() {
			$scope.empresas = Empresas.query();
		};

		// Retorna una empresa
		$scope.findOne = function() {
			$scope.empresa = Empresas.get({ 
				empresaId: $stateParams.empresaId
			});
		};

		// Busca por empresa
		$scope.empresaSearch = function(empresa) {
			$location.path('empresas/' + empresa._id);
		};

        $scope.sendMail = function(){
        	var data = ({ // Almacena los datos del formulario
    	    	contactoNombre : this.contactoNombre,
    	    	contactoEmail : this.contactoEmail,
    	    	contactoTelefono : this.contactoTelefono,
    	    	contactoConsulta : this.contactoConsulta
    	    });

    	    $http({
    	    	method:'POST',
    	    	url:'/contacto',
    	    	data: data,
    	    }).then(function successCallback(response) {
    	    		console.log("Se envió correctamente la consulta");
    				toastr.options = {
    				  "closeButton": true,
    				  "progressBar": true,
    				  "timeOut": "3000",
    				  "extendedTimeOut": "1000"
    				};
    	    		toastr.success('Consulta enviada, muchas gracias!');
    	    		$location.path('/'); // Redirecciona al home
    		  }, function errorCallback(response) {
    	    		console.log("No se ha enviado la consulta");
    		  });
    	};
	}
]);