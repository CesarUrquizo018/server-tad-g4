require('dotenv').config();  // Carga las variables de entorno

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT
    }
);

sequelize.authenticate()
    .then(() => console.log('Conexión a la base de datos establecida con éxito.'))
    .catch(error => console.error('Error al conectar con la base de datos:', error));

module.exports = sequelize;
