'use strict';

module.exports = {
	db: 'mongodb://localhost/norisk-dev',
	app: {
		title: 'norisk',
		description: 'Somos NORISK-ARGENTINA, una empresa joven especializada en venta de productos de seguridad vial e industrial.',
		keywords: 'Seguridad, seguridad vial, vial, conos, cono, modelo, utilitario, camino, king cone, transporte, minero, rutero, obrador, autopista, camino, ruta, calle, línea económica, ciudad, econo, cono de polietileno semirigido, vencedor, cono de pvc flexible con memoria, souvenir, mini, multiuso, tortuga, demarcatorios, delineador rebatible, reflectivo, poliuretano, ordenador de fila, polietileno semirigido, cinta autoenrollable, columna,  collares HIP, pancarta, bucisenda, puntera bicisenda, carril, punteras carril, reductores de velocidad, despertador, atenuador, banda HIP, garita, rampa, lomo de burro, punteras lomo, tacha divisoria bidireccional, protectores y canalizadores, bumper, urbano, transito, canalizador de transito, campana, antichoque, indicadores, reloj, totem, wet floor, piso mojado, mojón, carteleria, reducción de calzada, banderillero, acero zincado, normas DNV, hombres trabajando, obra, equipo pesado en la vía, mano única, zona de obras, calzada en desnivel, GIP, area restringida, cartel plástico, desvío a la derecha, desvío a la izquierda, circule con precaución, reducción de calzada, obra en construcción, zanja abierta, no avanzar, plástico corrugado, atril, sostén de carteles, accesorios, tope de estacionamiento, garage, calza, calzas para neumáticos, soga de unión, subida cordón, malla, polipropileno, baliluz, soga de nylon, cadenas, cinta precaución, cinta peligro, batería descartable, baliza autoportante, led flash, señalización nocturna, flash cone, organizacion vial, señalizacion Vial, seguridad Industrial, proteccion personal'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || 'APP_ID',
		clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
		callbackURL: '/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || 'APP_ID',
		clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
		callbackURL: '/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: '/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};
