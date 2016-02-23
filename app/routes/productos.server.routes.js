'use strict';

module.exports = function(app) {
	var productos = require('../controllers/productos.server.controller');
	var users = require('../controllers/users.server.controller');

	app.route('/productos')
		.get(productos.list)
		.post(productos.create);

	app.route('/productos/:productoId')
		.get(productos.read)
		.put(productos.update)
		.delete(productos.delete);

	// Finish by binding the article middleware
	app.param('productoId', productos.getByID);
};