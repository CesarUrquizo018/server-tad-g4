//src/models/model_estado_solicitud.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class EstadoSolicitud extends Model {}

EstadoSolicitud.init({
    id_estado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_estado: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'EstadoSolicitud',
    tableName: 'estado_solicitud',
    timestamps: false
});

module.exports = EstadoSolicitud;
