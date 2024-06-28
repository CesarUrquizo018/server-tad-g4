// src/models/model_miembros_proyecto.js
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
            model: 'Usuario',
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

MiembrosProyecto.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });
MiembrosProyecto.belongsTo(Proyecto, { foreignKey: 'id_proyecto', as: 'proyecto' });

Usuario.belongsToMany(Proyecto, { through: MiembrosProyecto, foreignKey: 'id_usuario' });
Proyecto.belongsToMany(Usuario, { through: MiembrosProyecto, foreignKey: 'id_proyecto' });

module.exports = MiembrosProyecto;
