'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors.server.controller'),
  Empresa = mongoose.model('Empresa'),
    _ = require('lodash');

var crud = require('./crud.server.controller')('Empresa', 'nombre');

module.exports = crud;
