// --> Importamos los paquetes con los MiddleWares.
var express = require('express');	// : Express debe importarse en todos los archivos donde se necesite, 
									//   el gestor de paquetes ya sabe que es 'express' y carga la libreria
									//   una sola vez.
var router = express.Router();		// : Generamos un enrutador (básico genérico) en una variable.

var quizController = require( '../controllers/quiz_controller' ); // : Importamos el controlador de quiz.

// --> Instalamos un MiddleWare al enrutador, asignandole el PATH (o ruta) de deseamos que atienda.
/* GET home page. */
router.get('/', function(req, res) {			// : Se ejecutará si la ruta está vacia pero teniendo encuenta 
												//   la ruta inicial creada para este enrutador en 'app.js',
												//   para este caso siempre que la ruta vacia esté sobre '/'
												//   (ver 'app.js', línea 39)
  	res.render('index', { title: 'Quiz' });		// : Renderiza el fichero 'index.js' que se encuentra en 'views', 
  												//   pasandole como parámetros algunos valores.
});

// --> Instalamos un MiddleWare al enrutador
/* GET author page. */
router .get( '/author', function( req, res ) {			// : Se ejecutará si la ruta está vacia pero teniendo encuenta 
												//   la ruta inicial creada para este enrutador en 'app.js',
												//   para este caso siempre que la ruta vacia esté sobre '/author'

	res.render(
  		'author',								// : Renderiza el fichero 'index.js' que se encuentra en 'views', 
  												//   pasandole como parámetros algunos valores. 
  		{ 
			curso: 'Desarrollo de servicios en la nube con HTML5, JavaScript y NodeJS',
			author: 'Juan Carlos Jiménez Gutiérrez',
			profesion: 'Analista y Desarrollador de Sistemas de Información',
			correo: 'jcjimenez29@misena.edu.co',
			photo: '<img id="photo" src="./images/juancarlos.jpg" title="Juan Carlos Jiménez Gutiérrez" alt="Juan Carlos Jiménez Gutiérrez" />', 
			teacher: 'Juan Quemada',
			claustro: 'Universidad Politécnica de Madrid',
			video: '<iframe src="https://www.youtube.com/embed/5uvM7zeLGyQ" frameborder="0" allowfullscreen></iframe>'
		}
	);

});

// --> Instalamos los MiddleWares al enrutador, asignandole los PATH ( answer y question )
router .get( '/quizes/question', quizController .question );
router .get( '/quizes/answer', quizController .answer );

// --> Exportamos 'router' para comando de arranque.
module.exports = router;