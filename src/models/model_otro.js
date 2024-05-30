const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Proyecto = require('./model_proyecto');

class Otro extends Model {}

Otro.init({
    id_otro: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    NombreOtro: DataTypes.STRING(255),
    DescripcionOtro: DataTypes.TEXT,
    id_proyecto: DataTypes.INTEGER  // Esta es la clave foránea que enlaza con Proyecto
}, {
    sequelize,
    modelName: 'Otro',
    tableName: 'otro',
    timestamps: false
});

Otro.belongsTo(Proyecto, { foreignKey: 'id_proyecto' });

module.exports = Otro;