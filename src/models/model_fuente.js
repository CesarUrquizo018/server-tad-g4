//src/models/model_fuente
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Proyecto = require('./model_proyecto');

class Fuente extends Model {}

Fuente.init({
    id_fuente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    NombreFuente: DataTypes.STRING(255),
    URLFuente: DataTypes.STRING(255),
    FechaPublicacion: DataTypes.DATEONLY,
    id_proyecto: DataTypes.INTEGER
}, {
    sequelize,
    modelName: 'Fuente',
    tableName: 'fuente',
    timestamps: false
});

Fuente.belongsTo(Proyecto, { foreignKey: 'id_proyecto' });

module.exports = Fuente;