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
	nombre: {
		type: String,
		default: '',
		trim: true
	},
	descripcion: {
		type: String,
		default: '',
		trim: true
	},
	eslogan: {
		type: String,
		default: '',
		trim: true
	}
});

mongoose.model('Empresa', EmpresaSchema);