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
  res.render('index', { title: 'Quiz' });	// : Renderiza el fichero 'index.js' que se encuentra en 'views', 
  												//   pasandole como parámetros algunos valores
});

// --> Instalamos los MiddleWares al enrutador, asignandole los PATH ( answer y question )
router .get( '/quizes/question', quizController .question );
router .get( '/quizes/answer', quizController .answer );

// --> Exportamos 'router' para comando de arranque.
module.exports = router;