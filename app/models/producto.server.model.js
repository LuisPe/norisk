'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Producto Schema
 */
var ProductoSchema = new Schema({
	categoria: { 
		type: Schema.Types.ObjectId,
		ref: 'Categoria'
		//, required: 'invalid category' // TODO: make tests pass valid category
	},
	nombre: {
		type: String,
		default: '',
		trim: true 	
	},
	codigo: {
		type: String,
		default: '',
		trim: true
	},
	descripcion: {
		type: String,
		default: '',
		trim: true
	},
	reflectivos: {
		type: String,
		default: '',
		trim: true
	},
	altura: {
		type: String,
		default: '',
		trim: true
	},
	base: {
		type: String,
		default: '',
		trim: true
	},
	peso: {
		type: String,
		default: '',
		trim: true
	},
	colores: {
		type: String,
		default: '',
		trim: true
	},
	precioUnitario: {
		type: Number,
		default: 0
	},
	stock: {
		type: Number,
		default: 0,
		min: 0
	}
});

mongoose.model('Producto', ProductoSchema);