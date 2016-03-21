'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');
	app.route('/').get(core.index);

	// Envíos de email
	app.route('/presupuesto').post(core.sendMailPresupuesto);
	app.route('/contacto').post(core.sendMailContacto);

//	app.route('/imagen').post(core.uploadImage); Upload imagen - No funciona
};