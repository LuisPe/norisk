'use strict';

// Empresas controller
angular.module('empresas').controller('EmpresasController', ['$scope', '$stateParams', '$location', 'Authentication', 'Empresas', '$http',
	function($scope, $stateParams, $location, Authentication, Empresas, $http) {
		$scope.authentication = Authentication;
	  	$scope.currentPage = 1;
	  	$scope.pageSize = 10;
	  	$scope.offset = 0;

	  	// Page changed handler
	  	$scope.pageChanged = function() {
	   	$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
	  	};

		// Create new Category
		$scope.create = function() {
			// Create new Category object
			var empresa = new Empresas ({
				descripcion: this.descripcion,
				nombre: this.nombre
			});

			// Redirect after save
			empresa.$save(function(response) {
				$location.path('empresas/' + response._id);

				// Clear form fields
				$scope.nombre = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Category
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

		// Update existing Category
		$scope.update = function() {
			var empresa = $scope.empresa;

			empresa.$update(function() {
				$location.path('la-empresa');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Empresas
		$scope.find = function() {
			$scope.empresas = Empresas.query();
		};

		// Find existing Category
		$scope.findOne = function() {
			$scope.empresa = Empresas.get({ 
				empresaId: $stateParams.empresaId
			});
		};

		// Search for a empresa
		$scope.empresaSearch = function(empresa) {
			$location.path('empresas/' + empresa._id);
		};

		//SEND EMAIL
        $scope.sendMail = function(){
    	    var data = ({
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
    	    		$location.path('/');
    		  }, function errorCallback(response) {
    	    		console.log("No se ha enviado la consulta");
    		  });
    	};
	}
]);