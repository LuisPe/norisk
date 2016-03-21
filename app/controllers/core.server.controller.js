'use strict';


var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var wellknown = require('nodemailer-wellknown'); // Servicios conocidos
var config = wellknown('zoho'); // Configuración servicio zoho

// create reusable transporter object
var transporter = nodemailer.createTransport(smtpTransport({
	service: 'zoho',
    auth: {
    	user: "ventas@noriskargentina.com.ar",
    	pass: "norisk2016"
    }
}));

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
 * Enviar consulta por email.
 */
exports.sendMailContacto = function(req, res){

	var data = req.body;

	var mailOptions = {
		from: 'noriskargentina@gmail.com',
		to:'ventas@noriskargentina.com.ar',
		subject: 'Nueva Consulta Norisk',
		html: "<b>Nombre: </b> "+data.contactoNombre+"<br><b>Email: </b>"+data.contactoEmail+"<br><b>Teléfono: </b>"+data.contactoTelefono+"<br><b>Consulta: </b><br>"+data.contactoConsulta,
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
		    return console.log(error);
		}
	console.log('Message sent: ' + info.response);
	});
	
	res.json('Success'); // Retorna el servicio http
};

/**
 * Enviar presupuesto por email.
 */
exports.sendMailPresupuesto = function(req, res){

	var data = req.body;
	var productos = "";

	for (var p in data.pedido){ // Listado de productos dentro del pedido
		productos += "<li>Producto: "+data.pedido[p].producto+ ", Cantidad: "+data.pedido[p].cantidad+"</li>";
	}

	var mailOptions = {
		from: 'noriskargentina@gmail.com',
		to:'ventas@noriskargentina.com.ar',
		subject: 'Nuevo Pedido Norisk',
		html: "<b>Nombre: </b> "+data.contactoNombre+"<br><b>Email: </b>"+data.contactoEmail+"<br><b>Teléfono: </b>"+data.contactoTelefono+"<br><b>Pedido:</b><br> <ul>"+productos+"</ul>",
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
		    return console.log(error);
		}
	console.log('Message sent: ' + info.response);
	});

	res.json('Success'); // Retorna el servicio http
};

// Upload File - No funciona
/*
var express	=	require("express");
var multer	=	require('multer');

exports.uploadImage = function(req,res){
	var image = req.body;
	var upload = multer({   dest: '../public/images/'}).single(image);
	upload(req,res,function(err) {
		if(err) {
			return res.end("Error uploading file.");
		}
		res.end("File is uploaded");
	});
};
*/