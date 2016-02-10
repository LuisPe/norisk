'use strict';

//Setting up route
angular.module('categorias').config(['$stateProvider',
	function($stateProvider) {
		// Categories state routing
		$stateProvider.
		state('categorias', {
			url: '/categorias',
			templateUrl: 'modules/categorias/views/categorias.client.view.html'
		}).
		state('create-categoria', {
			url: '/categorias/create',
			templateUrl: 'modules/categorias/views/create-categoria.client.view.html'
		}).
		state('view-categoria', {
			url: '/categorias/:categoriaId',
			templateUrl: 'modules/categorias/views/view-categoria.client.view.html'
		}).
		state('edit-categoria', {
			url: '/categorias/:categoriaId/edit',
			templateUrl: 'modules/categorias/views/edit-categoria.client.view.html'
		});
	}
]);