//src/config/database
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bd-tad-g4', 'admintadg4', 'bd-tad-g4', {
    host: 'bd-tad-g4.mysql.database.azure.com',
    dialect: 'mysql',
    port: 3306
});

sequelize.authenticate()
    .then(() => console.log('Conexión a la base de datos establecida con éxito.'))
    .catch(error => console.error('Error al conectar con la base de datos:', error));

module.exports = sequelize;
