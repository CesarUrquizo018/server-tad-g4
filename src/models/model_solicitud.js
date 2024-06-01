const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./model_usuario');
const Proyecto = require('./model_proyecto');
const EstadoSolicitud = require('./model_estado_solicitud');

class Solicitud extends Model {}

Solicitud.init({
    id_solicitud: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id_usuario'
        }
    },
    id_proyecto: {
        type: DataTypes.INTEGER,
        references: {
            model: Proyecto,
            key: 'id_proyecto'
        }
    },
    id_estado: {
        type: DataTypes.INTEGER,
        references: {
            model: EstadoSolicitud,
            key: 'id_estado'
        }
    },
    fecha_solicitud: DataTypes.DATEONLY,
    mensaje: DataTypes.TEXT
}, {
    sequelize,
    modelName: 'Solicitud',
    tableName: 'solicitud',
    timestamps: false
});

Solicitud.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Solicitud.belongsTo(Proyecto, { foreignKey: 'id_proyecto' });
Solicitud.belongsTo(EstadoSolicitud, { foreignKey: 'id_estado' });

module.exports = Solicitud;
