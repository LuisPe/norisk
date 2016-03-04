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
	nombre: {
		type: String,
		default: '',
		trim: true
	}
});

mongoose.model('Empresa', EmpresaSchema);