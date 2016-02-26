'use strict';

var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://luispedrotoloy%40gmail.com:ermafa_03@smtp.gmail.com');

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};

/**
 * Enviar presupuesto por email.
 */
exports.sendMail = function(req, res){

	var data = req.body;

	var mailOptions = {
		from: data.contactoEmail,
		to:'luiyo_toloy@hotmail.com',
		subject: 'Nuevo Pedido Norisk',
		text: data.pedido,
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
		    return console.log(error);
		}
	console.log('Message sent: ' + info.response);
	});
};