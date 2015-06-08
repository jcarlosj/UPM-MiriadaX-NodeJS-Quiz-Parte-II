// --> Importamos los paquetes con los MiddleWares de serie de Express.
var express = require('express');
var path = require('path');

// --> MiddleWares de la comunidad que no se encuentran en express (MiddleWares Predefinidos).
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// --> Importamos los Enrutadores (Tienen estructura de módulos)
var routes = require('./routes/index');
var users = require('./routes/users');

// --> Creamos la aplicación (Generador de Closures)
var app = express();

// --> Definimos algunos parámetros.

// view engine setup
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');          // Jade (Renderizador de vistas por defecto de Express)

// --> Instalación de todos los MiddleWares importados.

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// --> Este MiddleWare ya esta incluido en el paquete de Express, razón por la cual no lo hemos importado como los otros.
app.use(express.static(path.join(__dirname, 'public'))); 

// --> Instalación de los MiddleWares (Enrutadores) sobre los cuales estará definida la lógica de la aplicación.
//     para ello hacemos uso de los Enrutadores, asociando la ruta a su gestor.
//     NOTA: Aquí se han instalado los enrutadores con 'use', pero se deben instalar con 'get'
app.use('/', routes);
app.use('/users', users);

// --> Instalación del MiddleWare que procesará todas las rutas no definidas en los enrutadores.
//     Generando un error 404 de HTTP e invocando un MiddleWare de Error.

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);      // : Llamada al MiddleWare de Error
});

// error handlers
// --> Gestiona los errores durante la fase de desarrollo. Este MiddleWare se instala solo si la condición se cumple, 
//     de lo contrario no se instala. 

// development error handler: will print stacktrace
if (app.get('env') === 'development') {

    // --> Instalación del MiddleWare de Error de Desarrollo.
    app.use(function(err, req, res, next) {     
    
        res.status(err.status || 500);
        res.render('error', {           // : Renderiza el fichero 'error.js' que se encuentra en 'views', 
                                        //   pasandole como parámetros algunos valores.
            message: err.message,
            error: err                  // : Imprime los valores del respectivo Stack de Errores.
        });

    });

}
// --> Gestiona los errores durante la fase de producción. Este MiddleWare se instala solo si la condición se cumple, 
//     de lo contrario no se instala. 

// production error handler: no stacktraces leaked to user
// --> Instalación del MiddleWare de Error de Producción.
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {               // : Renderiza el fichero 'error.js' que se encuentra en 'views', 
                                        //   pasandole como parámetros algunos valores.
        message: err.message,
        error: {}                       // : No imprime los valores del Stack de Errores por que el objeto esta vacio.
    });
});

// --> Exportamos 'app' para comando de arranque.
module.exports = app;
