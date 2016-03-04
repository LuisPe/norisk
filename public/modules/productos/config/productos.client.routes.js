'use strict';

// Configurando rutas
angular.module('productos').config(['$stateProvider',
	function($stateProvider) {
		// Rutas de Productos
		$stateProvider.
		state('productos', {
			url: '/productos',
			templateUrl: 'modules/productos/views/productos.client.view.html'
		}).
		state('create-producto', {
			url: '/productos/create',
			templateUrl: 'modules/productos/views/create-producto.client.view.html'
		}).
		state('view-producto', {
			url: '/productos/:productoId',
			templateUrl: 'modules/productos/views/view-producto.client.view.html'
		}).
		state('edit-producto', {
			url: '/productos/:productoId/edit',
			templateUrl: 'modules/productos/views/edit-producto.client.view.html'
		});
	}
]);