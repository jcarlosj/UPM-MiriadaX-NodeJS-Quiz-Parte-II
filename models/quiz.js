// Definicion del modelo Quiz

// Creamos la funciona para crear la tabla SQLlite
module .exports = function( sequelize, DataTypes ) {
	// Creamos la estructura de datos y la retornamos.
	return sequelize .define(
		'Quiz', 	// Nombre de la tabla.
		{			// Campos de la tabla.
			pregunta:  DataTypes .STRING,
			respuesta: DataTypes .STRING,
		}
	);
}