'use strict';

//Setting up route
angular.module('empresas').config(['$stateProvider',
	function($stateProvider) {
		// Empresas state routing
		$stateProvider.
		state('create-empresa', {
			url: '/empresascreate',
			templateUrl: 'modules/empresas/views/create-empresa.client.view.html'
		}).
		state('contacto', {
			url: '/contacto',
			templateUrl: 'modules/empresas/views/contacto-empresa.client.view.html'
		}).
		state('empresas', {
			url: '/empresas',
			templateUrl: 'modules/empresas/views/empresas.client.view.html'
		});
	}
]);