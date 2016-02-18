'use strict';

// Categorias controller
angular.module('categorias').controller('CategoriasController', ['$scope', '$stateParams', '$location', 'Authentication', 'Categorias','Productos',
'$filter',
	function($scope, $stateParams, $location, Authentication, Categorias, Productos,$filter) {
		$scope.authentication = Authentication;
		$scope.productos = Productos.query();
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
			var categoria = new Categorias ({
				categoria: this.categoria,
				nombre: this.nombre,
				descripcion: this.descripcion,
				foto: this.foto
			});

			// Redirect after save
			categoria.$save(function(response) {
				$location.path('categorias/' + response._id);

				// Clear form fields
				$scope.nombre = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Category
		$scope.remove = function(categoria) {
			if ( categoria ) { 
				categoria.$remove();

				for (var i in $scope.categorias) {
					if ($scope.categorias [i] === categoria) {
						$scope.categorias.splice(i, 1);
					}
				}
			} else {
				$scope.categoria.$remove(function() {
					$location.path('categorias');
				});
			}
		};

		// Update existing Category
		$scope.update = function() {
			var categoria = $scope.categoria;

			categoria.$update(function() {
				$location.path('categorias/' + categoria._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Categorias
		$scope.find = function() {
			$scope.categorias = Categorias.query();
		};

		// Find existing Category
		$scope.findOne = function() {
			$scope.categoria = Categorias.get({ 
				categoriaId: $stateParams.categoriaId
			});
		};

		// Search for a categoria
		$scope.categoriaSearch = function(producto) {
			$location.path('categorias/' + producto._id);
		};

		//Listado de productos
		$scope.listarProductos = function(categoria){
			$location.path('/categorias/' + categoria._id);
		};
	}
]);