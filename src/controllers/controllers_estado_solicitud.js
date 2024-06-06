//src/controllers/controllers_controllers_estado_solicitud.js
const EstadoSolicitud = require('../models/model_estado_solicitud');

const estadoSolicitudController = {

    getAllEstados: async (req, res) => {
        try {
            const estados = await EstadoSolicitud.findAll();
            res.json(estados);
        } catch (error) {
            console.error('Error al obtener estados:', error);
            res.status(500).send({ message: 'Error al obtener estados' });
        }
    },

    getEstadoById: async (req, res) => {
        try {
            const estado = await EstadoSolicitud.findByPk(req.params.id);
            if (estado) {
                res.json(estado);
            } else {
                res.status(404).send({ message: 'Estado no encontrado' });
            }
        } catch (error) {
            console.error('Error al obtener el estado:', error);
            res.status(500).send({ message: 'Error al obtener el estado' });
        }
    },

    createEstado: async (req, res) => {
        try {
            const estado = await EstadoSolicitud.create(req.body);
            res.status(201).json(estado);
        } catch (error) {
            console.error('Error al crear el estado:', error);
            res.status(500).send({ message: 'Error al crear el estado' });
        }
    },

    updateEstado: async (req, res) => {
        try {
            const estado = await EstadoSolicitud.findByPk(req.params.id);
            if (estado) {
                await estado.update(req.body);
                res.json(estado);
            } else {
                res.status(404).send({ message: 'Estado no encontrado' });
            }
        } catch (error) {
            console.error('Error al actualizar el estado:', error);
            res.status(500).send({ message: 'Error al actualizar el estado' });
        }
    },

    deleteEstado: async (req, res) => {
        try {
            const result = await EstadoSolicitud.destroy({
                where: { id_estado: req.params.id }
            });
            if (result) {
                res.send({ message: 'Estado eliminado' });
            } else {
                res.status(404).send({ message: 'Estado no encontrado' });
            }
        } catch (error) {
            console.error('Error al eliminar el estado:', error);
            res.status(500).send({ message: 'Error al eliminar el estado' });
        }
    }
};

module.exports = estadoSolicitudController;
