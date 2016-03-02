'use strict';

// Productos controller
angular.module('productos').controller('ProductosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Productos', 'Categorias', '$filter',
	function($scope, $stateParams, $location, Authentication, Productos, Categorias, $filter) {
		$scope.authentication = Authentication;
		$scope.categorias = Categorias.query();
		$scope.currentPage = 1;
		$scope.pageSize = 10;
		$scope.offset = 0;
		
		// Page changed handler
		$scope.pageChanged = function() {
			$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
		};

		// Create new Product
		$scope.create = function() {
			var producto = new Productos ({
				nombre: this.nombre,
				categoria: this.categoria,
				codigo: this.codigo,
				descripcion: this.descripcion,
				reflectivos: this.reflectivos,
				altura: this.altura,
				base: this.base,
				peso: this.peso,
				colores: this.colores,
				foto: this.foto
			});

			// Redirect after save
			producto.$save(function(response) {
				$location.path('productos/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Product
		$scope.remove = function(producto) {
			if ( producto ) {
				producto.$remove();

				for (var i in $scope.productos) {
					if ($scope.productos [i] === producto) {
						$scope.productos.splice(i, 1);
					}
				}
			} else {
				$scope.producto.$remove(function() {
					$location.path('productos');
				});
			};
			toastr.options = {
			  "closeButton": true,
			  "progressBar": true,
			  "timeOut": "3000",
			  "extendedTimeOut": "1000"
			};
			toast('Producto eliminado');
		};

		// Update existing Product
		$scope.update = function() {
			var producto = $scope.producto;
			producto.categoria = producto.categoria._id;

			producto.$update(function() {
				$location.path('productos/' + producto._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
			toast('Producto actualizado')
		};

		var appendCategory = function appendCategory(p) {
			// You could substitue use of filter here with underscore etc.
			p.categoria = $filter('filter')($scope.categorias, {_id: p.categoria})[0];
		};

		// Find a list of Productos
		$scope.find = function() {
			Productos.query(function loadedProductos(productos) {
				productos.forEach(appendCategory);
				$scope.productos = productos;
			});
		};

		// Find existing Product
		$scope.findOne = function() {
			$scope.producto = Productos.get({
				productoId: $stateParams.productoId
			}, appendCategory);
		};

		// Search for a producto
		$scope.productoSearch = function(producto) {
			$location.path('productos/' + producto._id);
		};

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