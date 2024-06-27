const Solicitud = require('../models/model_solicitud');
const MiembrosProyecto = require('../models/model_miembros_proyecto');
const Proyecto = require('../models/model_proyecto');
const Usuario = require('../models/model_usuario');

const solicitudController = {
    getAllSolicitudes: async (req, res) => {
        try {
            const solicitudes = await Solicitud.findAll({
                include: [
                    {
                        model: Proyecto,
                        as: 'proyecto',
                        include: [{ model: Usuario, as: 'creador', attributes: ['nombre'] }]
                    },
                    { model: Usuario, as: 'remitente', attributes: ['nombre'] },
                    { model: Usuario, as: 'receptor', attributes: ['nombre'] }
                ]
            });
            res.json(solicitudes);
        } catch (error) {
            console.error('Error al obtener solicitudes:', error);
            res.status(500).send({ message: 'Error al obtener solicitudes' });
        }
    },

    getSolicitudById: async (req, res) => {
        try {
            const solicitud = await Solicitud.findByPk(req.params.id, {
                include: [
                    {
                        model: Proyecto,
                        as: 'proyecto',
                        include: [{ model: Usuario, as: 'creador', attributes: ['nombre'] }]
                    },
                    { model: Usuario, as: 'remitente', attributes: ['nombre'] },
                    { model: Usuario, as: 'receptor', attributes: ['nombre'] }
                ]
            });
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
            const { id_remitente, id_proyecto, mensaje } = req.body;
            const proyecto = await Proyecto.findByPk(id_proyecto);
            if (!proyecto) {
                return res.status(404).json({ message: 'Proyecto no encontrado' });
            }

            const solicitud = await Solicitud.create({
                id_remitente,
                id_receptor: proyecto.id_usuario,
                id_proyecto,
                id_estado: 1,
                fecha_solicitud: new Date().toISOString().slice(0, 10),
                mensaje
            });

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

                if (req.body.id_estado === 2) {
                    await MiembrosProyecto.create({ id_usuario: solicitud.id_remitente, id_proyecto: solicitud.id_proyecto });
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
                where: { id_proyecto: req.params.id_proyecto },
                include: [
                    {
                        model: Proyecto,
                        as: 'proyecto',
                        include: [{ model: Usuario, as: 'creador', attributes: ['nombre'] }]
                    },
                    { model: Usuario, as: 'remitente', attributes: ['nombre'] },
                    { model: Usuario, as: 'receptor', attributes: ['nombre'] }
                ]
            });
            res.json(solicitudes);
        } catch (error) {
            console.error('Error al obtener las solicitudes:', error);
            res.status(500).send({ message: 'Error al obtener las solicitudes' });
        }
    },

    acceptSolicitud: async (req, res) => {
        try {
            const solicitud = await Solicitud.findByPk(req.params.id);
            if (solicitud) {
                await solicitud.update({ id_estado: 2 });
                await MiembrosProyecto.create({
                    id_usuario: solicitud.id_remitente,
                    id_proyecto: solicitud.id_proyecto,
                });
                res.json({ message: 'Solicitud aceptada' });
            } else {
                res.status(404).send({ message: 'Solicitud no encontrada' });
            }
        } catch (error) {
            console.error('Error al aceptar la solicitud:', error);
            res.status(500).send({ message: 'Error al aceptar la solicitud' });
        }
    },

    rejectSolicitud: async (req, res) => {
        try {
            const solicitud = await Solicitud.findByPk(req.params.id);
            if (solicitud) {
                await solicitud.update({ id_estado: 3 });
                res.json({ message: 'Solicitud rechazada' });
            } else {
                res.status(404).send({ message: 'Solicitud no encontrada' });
            }
        } catch (error) {
            console.error('Error al rechazar la solicitud:', error);
            res.status(500).send({ message: 'Error al rechazar la solicitud' });
        }
    },

    obtenerSolicitudesRecibidas: async (req, res) => {
        try {
            const solicitudes = await Solicitud.findAll({
                where: { id_receptor: req.user.id_usuario },
                include: [
                    {
                        model: Proyecto,
                        as: 'proyecto',
                        include: [{ model: Usuario, as: 'creador', attributes: ['nombre'] }]
                    },
                    { model: Usuario, as: 'remitente', attributes: ['nombre'] },
                    { model: Usuario, as: 'receptor', attributes: ['nombre'] }
                ]
            });
            res.json(solicitudes);
        } catch (error) {
            console.error('Error al obtener solicitudes recibidas:', error);
            res.status(500).send({ message: 'Error al obtener solicitudes recibidas' });
        }
    },

    obtenerSolicitudesEnviadas: async (req, res) => {
        try {
            const solicitudes = await Solicitud.findAll({
                where: { id_remitente: req.user.id_usuario },
                include: [
                    {
                        model: Proyecto,
                        as: 'proyecto',
                        include: [{ model: Usuario, as: 'creador', attributes: ['nombre'] }]
                    },
                    { model: Usuario, as: 'remitente', attributes: ['nombre'] },
                    { model: Usuario, as: 'receptor', attributes: ['nombre'] }
                ]
            });
            res.json(solicitudes);
        } catch (error) {
            console.error('Error al obtener solicitudes enviadas:', error);
            res.status(500).send({ message: 'Error al obtener solicitudes enviadas' });
        }
    }
};

module.exports = solicitudController;
