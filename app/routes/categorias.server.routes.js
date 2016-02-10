'use strict';

module.exports = function(app) {
	var categorias = require('../controllers/categorias.server.controller');

	app.route('/categorias')
		.get(categorias.list)
		.post(categorias.create);

	app.route('/categorias/:categoriaId')
		.get(categorias.read)
		.put(categorias.update)
		.delete(categorias.delete);

	// Finish by binding the article middleware
	app.param('categoriaId', categorias.getByID);
};