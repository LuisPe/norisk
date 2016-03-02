'use strict';

<<<<<<< HEAD
=======

var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
	service: 'gmail', // <- resolved as 'Postmark' from the wellknown info
    auth: {
    	user: "luispedrotoloy@gmail.com",
    	pass: "ermafa_03"
    }
});

>>>>>>> 76b0a6fcdf751097d9201029d5751fbd175f5280
/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
<<<<<<< HEAD
=======
};

/**
 * Enviar presupuesto por email.
 */
exports.sendMail = function(req, res){

	var data = req.body;
	var productos = "";

	for (var p in data.pedido){
		productos += "<li>Producto: "+data.pedido[p].producto+ ", Cantidad: "+data.pedido[p].cantidad+"</li>";
	};
	console.log(productos);

	var mailOptions = {
		from: data.contactoEmail,
		to:'luiyo_toloy@hotmail.com',
		subject: 'Nuevo Pedido Norisk',
		html: "<b>Nombre: </b> "+data.contactoNombre+"<br><b>Email: </b>"+data.contactoEmail+"<br><b>Teléfono: </b>"+data.contactoTelefono+"<br><b>Pedido:</b><br> <ul>"+productos+"</ul>",
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
		    return console.log(error);
		}
	console.log('Message sent: ' + info.response);
	});
>>>>>>> 76b0a6fcdf751097d9201029d5751fbd175f5280
};