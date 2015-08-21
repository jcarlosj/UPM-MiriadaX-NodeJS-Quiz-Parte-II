var models = require( '../models/models.js' );	//; Importamos el modelo

// GET /quizes/question
exports .question = function( req, res ) {
	models .Quiz .findAll() .success( function( quiz ) { 	//: '.findAll()' devuelve un array con los elementos que tiene la BD.
		res .render( 
			'quizes/question', 
			{ 
				pregunta: quiz[ 0 ] .pregunta
			} 
		);
	});
};

// GET /quizes/answer
exports .answer = function( req, res ) {
	models .Quiz .findAll() .success( function( quiz ) {	//: '.findAll()' devuelve un array con los elementos que tiene la BD.

		var mensaje = '';

		if( req .query .respuesta === quiz[ 0 ] .respuesta ) {
			mensaje = 'Correcto';
		}
		else {
			mensaje = 'Incorrecto';
		}
		
		res .render( 
			'quizes/answer', 
			{ 
				respuesta: mensaje
			} 
		);

	});
};