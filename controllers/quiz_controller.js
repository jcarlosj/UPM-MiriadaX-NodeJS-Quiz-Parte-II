var models = require( '../models/models.js' );	//; Importamos el modelo

// GET /quizes/:id
exports .show = function( req, res ) {
	// '.then()' reemplaza a '.success()' pues es el nuevo patron de estructuracion de composicion de 'Callbacks' que se llaman 'Promises'.  
	models .Quiz .find( req .params .quizId ) .then( function( quiz ) { 	//: '.find()' espera unos parametros de busqueda y deacuerdo a ellos
																			//: devuelve un array con los elementos que tiene la BD.
		res .render( 
			'quizes/show', 
			{ 
				quiz: quiz
			} 
		);
	});
};

// GET /quizes/:id/answer
exports .answer = function( req, res ) {
	models .Quiz .find( req .params .quizId ) .then( function( quiz ) {		//: '.find()' espera unos parametros de busqueda y deacuerdo a ellos
																			//: devuelve un array con los elementos que tiene la BD.

		var mensaje = '';

		if( req .query .respuesta === quiz .respuesta ) {
			mensaje = 'Correcto';
		}
		else {
			mensaje = 'Incorrecto';
		}
		
		res .render( 
			'quizes/answer', 
			{ 
				respuesta: mensaje,
				quiz: quiz
			} 
		);

	});
};

// GET /quizes
exports .index = function( req, res ) {
	models .Quiz .findAll() .then( function( quizes) {		//: '.findAll()' devuelve un array con los elementos que tiene la BD.
		res .render( 
			'quizes/index.ejs',
			{
				quizes: quizes
			}
		);
	});
};