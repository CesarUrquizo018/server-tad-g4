const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./model_usuario');

class Proyecto extends Model {}

Proyecto.init({
    id_proyecto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: DataTypes.STRING(100),
    descripcion: DataTypes.TEXT,
    fecha_creacion: DataTypes.DATEONLY,
    ciclo: DataTypes.INTEGER,
    curso: DataTypes.STRING(120),
    id_usuario: DataTypes.INTEGER
}, {
    sequelize,
    modelName: 'Proyecto',
    tableName: 'proyecto',
    timestamps: false
});

Proyecto.belongsTo(Usuario, { foreignKey: 'id_usuario' });

module.exports = Proyecto;