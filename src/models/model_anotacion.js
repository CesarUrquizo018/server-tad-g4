//src/models/model_anotacion
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./model_usuario');
const Proyecto = require('./model_proyecto');

class Anotacion extends Model {}

Anotacion.init({
    id_anotacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ContenidoAnotacion: DataTypes.TEXT,
    id_usuario: DataTypes.INTEGER,
    id_proyecto: DataTypes.INTEGER
}, {
    sequelize,
    modelName: 'Anotacion',
    tableName: 'anotacion',
    timestamps: false
});

Anotacion.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Anotacion.belongsTo(Proyecto, { foreignKey: 'id_proyecto' });

module.exports = Anotacion;