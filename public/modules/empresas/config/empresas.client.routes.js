'use strict';

//Setting up route
angular.module('empresas').config(['$stateProvider',
	function($stateProvider) {
		// Categories state routing
		$stateProvider.
		state('empresas', {
			url: '/la-empresa',
			templateUrl: 'modules/empresas/views/empresas.client.view.html'
		}).
		state('create-empresa', {
			url: '/empresas/create',
			templateUrl: 'modules/empresas/views/create-empresa.client.view.html'
		}).
		state('view-empresa', {
			url: '/empresas/:empresaId',
			templateUrl: 'modules/empresas/views/view-empresa.client.view.html'
		}).
		state('contacto', {
			url: '/contacto',
			templateUrl: 'modules/empresas/views/contacto-empresa.client.view.html'
		}).
		state('edit-empresa', {
			url: '/empresas/:empresaId/edit',
			templateUrl: 'modules/empresas/views/edit-empresa.client.view.html'
		});
	}
]);