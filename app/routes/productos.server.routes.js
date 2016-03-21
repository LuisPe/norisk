'use strict';

module.exports = function(app) {
	var productos = require('../controllers/productos.server.controller');
	var users = require('../controllers/users.server.controller');
	var apiAuth = require('../controllers/api.authorization.server.controller');
	app.route('/productos')
		.get(productos.list)
		.post(apiAuth, users.requiresLogin, productos.create);

	app.route('/productos/:productoId')
		.get(productos.read)
		.put(apiAuth, users.requiresLogin, productos.update)
		.delete(apiAuth, users.requiresLogin, productos.delete);
	// Finish by binding the article middleware
	app.param('productoId', productos.getByID);
};