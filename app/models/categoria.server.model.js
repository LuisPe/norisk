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
	created: {
		type: Date,
		default: Date.now
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
	image:{ 
	    type: String, 
	    default: ''
	}
});

mongoose.model('Categoria', CategoriaSchema);