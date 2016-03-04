'use strict';

module.exports = function(app) {
	var empresas = require('../controllers/empresas.server.controller');
	var users = require('../controllers/users.server.controller');
	var apiAuth = require('../controllers/api.authorization.server.controller');
	
	app.route('/empresas')
		.get(empresas.list)
		.post(apiAuth, users.requiresLogin, empresas.create);

	app.route('/empresas/:empresaId')
		.get(empresas.read)
		.put(apiAuth, users.requiresLogin, empresas.update)
		.delete(apiAuth, users.requiresLogin, empresas.delete);

	// Finish by binding the article middleware
	app.param('empresaId', empresas.getByID);
};