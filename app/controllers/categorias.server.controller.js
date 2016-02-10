'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors.server.controller'),
  Categoria = mongoose.model('Categoria'),
    _ = require('lodash');

var crud = require('./crud.server.controller')('Categoria', 'nombre');

module.exports = crud;