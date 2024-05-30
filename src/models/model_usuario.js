const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Usuario extends Model {}

Usuario.init({
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    codigo: DataTypes.STRING,
    contrasena: DataTypes.STRING,
    foto_perfil: DataTypes.STRING
}, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuario',
    timestamps: false
});

module.exports = Usuario;