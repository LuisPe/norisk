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
	  	$scope.image='';

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
				descripcion: this.descripcion
			});

			/*if ($scope.image) {
       			$scope.upload($scope.image);
      		}*/

			// Redirect after save
			categoria.$save(function(response) {
				$location.path('categorias/' + response._id);

				// Clear form fields
				$scope.nombre = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
			toast('Categoría creada');
		};

		/*$scope.upload = function(image){
			Upload.upload({
            url: 'public/images',
            data: {file: image}
		        }).then(function (resp) {
		            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
		        }, function (resp) {
		            console.log('Error status: ' + resp.status);
		        }, function (evt) {
		            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
		            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
		        });
		};*/

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
			};
			toast('Categoría eliminada');
		};

		// Update existing Category
		$scope.update = function() {
			var categoria = $scope.categoria;

			categoria.$update(function() {
				$location.path('categorias/' + categoria._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
			toast('Categoría actualizada');
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

		$scope.mostrar = function(){
			$scope.mostrar = !$scope.mostrar;
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