//src/models/model_miembros_proyecto
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./model_usuario');
const Proyecto = require('./model_proyecto');

class MiembrosProyecto extends Model {}

MiembrosProyecto.init({
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Usuario',  // Asegúrate de que el nombre del modelo es correcto
            key: 'id_usuario'
        }
    },
    id_proyecto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Proyecto',
            key: 'id_proyecto'
        }
    }
}, {
    sequelize,
    modelName: 'MiembrosProyecto',
    tableName: 'miembros_proyecto',
    timestamps: false
});

// Definiendo explícitamente las relaciones
Usuario.belongsToMany(Proyecto, { through: MiembrosProyecto, foreignKey: 'id_usuario' });
Proyecto.belongsToMany(Usuario, { through: MiembrosProyecto, foreignKey: 'id_proyecto' });

module.exports = MiembrosProyecto;