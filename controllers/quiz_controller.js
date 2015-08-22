var models = require( '../models/models.js' );	//; Importamos el modelo

//-> Autoload = Factoriza el codigo si la ruta incluye un ':quizId'
//   Lanza una busqueda en la BD con el identificador que se le a pasado,
//   Gestionando el acceso a la BD y el tratamiento de los casos de error
//   Que pueden ocurrir.
exports .load = function( req, res, next, quizId ) {
	models .Quiz .find( quizId ) .then( function( quiz ) {
		if( quiz ) {
			req .quiz = quiz;		//: Si encuentra el registro en la BD, asigna el registro a una variable de la cabecera de la peticion.
			next();					//: Permite que se ejecute el siguiente MiddleWare (el que corresponda).
		}
		else {
			next( new Error( 'No existe el "id" = ' + quizId ) );	//: Si no existe notifica que el identificador no existe.
		}
	}) .catch( function( error ) {
		next( error );				//: Si existe otro tipo de error entonces se captura y se ejecutaria el siguiente MiddleWare de error.
	});
};

// GET /quizes/:id
exports .show = function( req, res ) {
	res .render( 
		'quizes/show', 
		{ 
			quiz: req .quiz 	//: Toma el valor contenido en la peticion 'req' de la variable 'quiz' 
								//: que ha sido devuelta por la funcion 'load'
		} 
	);
};

// GET /quizes/:id/answer
exports .answer = function( req, res ) {

	var mensaje = 'Incorrecto';

	if( req .query .respuesta === req .quiz .respuesta ) {		//: Toma el valor contenido en la peticion 'req' de la variable 'quiz' 
					    										//: que ha sido devuelta por la funcion 'load' y lo extendemos a respuesta
		mensaje = 'Correcto';
	}
		
	res .render( 
		'quizes/answer', 
		{ 
			respuesta: mensaje,
			quiz: req .quiz
		} 
	);

};

// GET /quizes
exports .index = function( req, res ) {

	// Valida si el 'path' (url) contiene el parametro 'search' con algun valor en el.
	if( req .query .search ) {
		var busqueda = req .query .search;			//: Asignamos el valor del parametro a una variable.
		busqueda = busqueda .trim();				//: Quitamos los espacios de inicio y fin de la cadena buscada.
		busqueda = busqueda .replace( ' ', '%' );	//: Reemplazamos los espacios en blanco por un % (porciento)
		busqueda = '%' + busqueda + '%';			//: Agregamos al principio y al final un % (porciento)
		console .log( '> ' + busqueda );

		// Consulta a la BD con el filtro para realizar una busqueda especifica
		models .Quiz .findAll( 
			{
				where: [ 'pregunta like ?', busqueda ],
				order: 'pregunta ASC'
			}
		) .then( function( quizes ) {
			res .render( 
				'quizes/index',
				{
					quizes: quizes
				}
			);
		}) .catch( function( error ) {
			next( error );
		});

	}
	else {
		// Valores que se listaran por defecto
		models .Quiz .findAll() .then( function( quizes ) {
			res .render(
				'quizes/index',
				{
					quizes: quizes
				}
			);
		}) .catch( function( error ) {
			next( error );
		});
	}

};