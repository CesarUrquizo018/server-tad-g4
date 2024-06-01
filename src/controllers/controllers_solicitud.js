const Solicitud = require('../models/model_solicitud');
const MiembrosProyecto = require('../models/model_miembros_proyecto');

const solicitudController = {
    getAllSolicitudes: async (req, res) => {
        try {
            const solicitudes = await Solicitud.findAll();
            res.json(solicitudes);
        } catch (error) {
            console.error('Error al obtener solicitudes:', error);
            res.status(500).send({ message: 'Error al obtener solicitudes' });
        }
    },

    getSolicitudById: async (req, res) => {
        try {
            const solicitud = await Solicitud.findByPk(req.params.id);
            if (solicitud) {
                res.json(solicitud);
            } else {
                res.status(404).send({ message: 'Solicitud no encontrada' });
            }
        } catch (error) {
            console.error('Error al obtener la solicitud:', error);
            res.status(500).send({ message: 'Error al obtener la solicitud' });
        }
    },

    createSolicitud: async (req, res) => {
        try {
            const solicitud = await Solicitud.create(req.body);
            res.status(201).json(solicitud);
        } catch (error) {
            console.error('Error al crear la solicitud:', error);
            res.status(500).send({ message: 'Error al crear la solicitud' });
        }
    },

    updateSolicitud: async (req, res) => {
        try {
            const solicitud = await Solicitud.findByPk(req.params.id);
            if (solicitud) {
                await solicitud.update(req.body);

                // Si el estado de la solicitud es "aceptado", agregar a miembros_proyecto
                if (req.body.id_estado === 2) { // Suponiendo que 2 es el ID del estado "aceptado"
                    await MiembrosProyecto.create({ id_usuario: solicitud.id_usuario, id_proyecto: solicitud.id_proyecto });
                }

                res.json(solicitud);
            } else {
                res.status(404).send({ message: 'Solicitud no encontrada' });
            }
        } catch (error) {
            console.error('Error al actualizar la solicitud:', error);
            res.status(500).send({ message: 'Error al actualizar la solicitud' });
        }
    },

    deleteSolicitud: async (req, res) => {
        try {
            const result = await Solicitud.destroy({
                where: { id_solicitud: req.params.id }
            });
            if (result) {
                res.send({ message: 'Solicitud eliminada' });
            } else {
                res.status(404).send({ message: 'Solicitud no encontrada' });
            }
        } catch (error) {
            console.error('Error al eliminar la solicitud:', error);
            res.status(500).send({ message: 'Error al eliminar la solicitud' });
        }
    },

    getSolicitudesByProyectoId: async (req, res) => {
        try {
            const solicitudes = await Solicitud.findAll({
                where: { id_proyecto: req.params.id_proyecto }
            });
            res.json(solicitudes);
        } catch (error) {
            console.error('Error al obtener las solicitudes:', error);
            res.status(500).send({ message: 'Error al obtener las solicitudes' });
        }
    }
};

module.exports = solicitudController;
