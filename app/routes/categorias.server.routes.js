'use strict';

module.exports = function(app) {
	var categorias = require('../controllers/categorias.server.controller');
	var users = require('../controllers/users.server.controller');
	var apiAuth = require('../controllers/api.authorization.server.controller');

	app.route('/categorias')
		.get(categorias.list)
		.post(apiAuth, users.requiresLogin, categorias.create);

	app.route('/categorias/:categoriaId')
		.get(categorias.read)
		.put(apiAuth, users.requiresLogin, categorias.update)
		.delete(apiAuth, users.requiresLogin, categorias.delete);

	// Finish by binding the article middleware
	app.param('categoriaId', categorias.getByID);
};