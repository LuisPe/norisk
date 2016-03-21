'use strict';
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors.server.controller'),
  Producto = mongoose.model('Producto'),
    _ = require('lodash');

var crud = require('./crud.server.controller')('Producto', 'nombre');

module.exports = crud;
