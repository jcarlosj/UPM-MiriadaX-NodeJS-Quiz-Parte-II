// --> Importamos los paquetes con los MiddleWares.
var express = require('express');	// : Express debe importarse en todos los archivos donde se necesite, 
									//   el gestor de paquetes ya sabe que es 'express' y carga la libreria
									//   una sola vez.
var router = express.Router();		// : Generamos un enrutador (básico genérico) en una variable.

// --> Instalamos un MiddleWare al enrutador, asignandole el PATH (o ruta) de deseamos que atienda.
/* GET users listing. */
router.get('/', function(req, res) {	// : Se ejecutará si la ruta está vacia pero teniendo encuenta 
										//   la ruta inicial creada para este enrutador en 'app.js',
										//   para este caso siempre que la ruta vacia después de '/users'
										//   (ver 'app.js', línea 40)
  res.send('respond with a resource');	// : Envia un String (cadena) como mensaje de respuesta, 
});

// --> Exportamos 'router' para comando de arranque.
module.exports = router;
