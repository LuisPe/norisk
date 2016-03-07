'use strict';

// Categorias controller
angular.module('categorias').controller('CategoriasController', ['$scope', '$stateParams', '$location', 'Authentication', 'Categorias','Productos',
'$filter',
	function($scope, $stateParams, $location, Authentication, Categorias, Productos, $filter) {
		$scope.authentication = Authentication;
		$scope.productos = Productos.query();
	  	$scope.currentPage = 1;
	  	$scope.pageSize = 10;
	  	$scope.offset = 0;
	  	$scope.mostrar = false;

		// Manejador del cambio de página
	  	$scope.pageChanged = function() {
	   		$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
	  	};

		// Crea una nueva categoría
		$scope.create = function() {

			var categoria = new Categorias ({
				categoria: this.categoria,
				nombre: this.nombre,
				descripcion: this.descripcion
			});

			categoria.$save(function(response) {
				$location.path('categorias/' + response._id);

				// Limpia los campos
				$scope.nombre = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
			toast('Categoría creada');
		};
		
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
			toast('Categoría eliminada');
		};

		// Actualiza categoría existente
		$scope.update = function() {
			var categoria = $scope.categoria;

			categoria.$update(function() {
				$location.path('categorias/' + categoria._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
			toast('Categoría actualizada');
		};

		// Lista categorías
		$scope.find = function() {
			$scope.categorias = Categorias.query();
		};

		// Retorna una categoría
		$scope.findOne = function() {
			$scope.categoria = Categorias.get({ 
				categoriaId: $stateParams.categoriaId
			});
		};

		// Busca una categoría
		$scope.categoriaSearch = function(producto) {
			$location.path('categorias/' + producto._id);
		};

		// Listado de productos
		$scope.listarProductos = function(categoria){
			$location.path('/categorias/' + categoria._id);
		};

		// Muestra botones de 'agregar a producto'
		$scope.mostrar = function(){
			$scope.mostrar = !$scope.mostrar;
		};

		// Alerta Toast
		var toast = function(msje){
			toastr.options = {
			  "closeButton": true,
			  "progressBar": true,
			  "timeOut": "3000",
			  "extendedTimeOut": "1000"
			};
			toastr.success(msje);
		};
	}
]);
