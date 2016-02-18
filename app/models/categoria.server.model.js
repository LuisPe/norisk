'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Categoria Schema
 */
var CategoriaSchema = new Schema({
	categoria: {
		type: String,
		default: '',
		trim: true, 	
		unique : true,
	},
	nombre: {
		type: String,
		default: '',
		trim: true, 	
		unique : true,
	},
	descripcion: {
		type: String,
		default: '',
		trim: true
	},
	foto: {
		type: String,
		default: '',
		trim: true
	}
});

mongoose.model('Categoria', CategoriaSchema);