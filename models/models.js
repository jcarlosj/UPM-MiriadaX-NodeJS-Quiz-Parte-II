var path = require( 'path' );

//-> Carga Modelo ORM (Sequelize)
var Sequelize = require( 'sequelize' );

//-> Usa BD SQlite
var sequelize = new Sequelize(
	null,
	null,
	null,
	{
		dialect: 'sqlite',
		storage: 'quiz.sqlite'	
	}
);

//-> Importa la definicion de la tabla 'Quiz' en 'quiz.js'
var Quiz = sequelize .import( path .join( __dirname, 'quiz' ) );

//-> Exporta la definicion de la tabla
exports .Quiz = Quiz;

//-> sequelize .sync()
//   Sincronizamos las definiciones que se encuentran en el modelo 'quiz.js' y se crea e inicializa 
//   la tabla de preguntas 'Quiz' en la BD. Ahora instalamos un 'Callback' ('function') con la funcion '.success()' que
//   Esta funci[on lo que permitira es que no se ejecute la sentencia siguiente hasta que no se halla 
//   sincronizado la tabla de la BD.
sequelize .sync() .success( function() {
	//-> success() ejecuta el manejador una vez creada la tabla.
	Quiz .count() .success( function( count ) {
		//-> La tabla se inicializa solo si esta vacia.
		if( count === 0 ) {
			Quiz .create(
				{
					pregunta: 'Capital de Italia',
					respuesta: 'Roma'
				}
			) .success( function() {
				console .log( 'Base de datos inicializada.' );
			});
		}
	});
});

//-> NOTA: 'success() es la forma antigua de utilizar los 'CallBacks' en 'sequelize', ahora se hace a traves de las 'promises'