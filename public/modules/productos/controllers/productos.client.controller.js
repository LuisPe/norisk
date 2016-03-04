'use strict';

// Productos controller
angular.module('productos').controller('ProductosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Productos', 'Categorias', '$filter',
	function($scope, $stateParams, $location, Authentication, Productos, Categorias, $filter) {
		$scope.authentication = Authentication;
		$scope.categorias = Categorias.query();
		$scope.currentPage = 1;
		$scope.pageSize = 10;
		$scope.offset = 0;
		
		// Manejador del cambio de página
		$scope.pageChanged = function() {
			$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
		};

		// Crea un nuevo producto
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

			// Redirecciona luego de guardar
			producto.$save(function(response) {
				$location.path('productos/' + response._id);

				// Limpia los campos
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Elimina producto
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
			}
			toast('Producto eliminado');
		};

		// Actualiza producto existente
		$scope.update = function() {
			var producto = $scope.producto;
			producto.categoria = producto.categoria._id;

			producto.$update(function() {
				$location.path('productos/' + producto._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
			toast('Producto actualizado');
		};

		var appendCategory = function appendCategory(p) {
			p.categoria = $filter('filter')($scope.categorias, {_id: p.categoria})[0];
		};

		// Lista productos
		$scope.find = function() {
			Productos.query(function loadedProductos(productos) {
				productos.forEach(appendCategory);
				$scope.productos = productos;
			});
		};

		// Retorna un producto
		$scope.findOne = function() {
			$scope.producto = Productos.get({
				productoId: $stateParams.productoId
			}, appendCategory);
		};

		// Busca un producto
		$scope.productoSearch = function(producto) {
			$location.path('productos/' + producto._id);
		};

		// Alerta toast
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