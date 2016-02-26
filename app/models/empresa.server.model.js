'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Empresa Schema
 */
var EmpresaSchema = new Schema({
	descripcion: {
		type: String,
		default: '',
		trim: true
	},
	vision: {
		type: String,
		default: '',
		trim: true
	},
	objetivos: {
		type: String,
		default: '',
		trim: true
	}
});

mongoose.model('Empresa', EmpresaSchema);