const MiembrosProyecto = require('../models/model_miembros_proyecto.js');
const Usuario = require('../models/model_usuario.js');

const miembrosProyectoController = {
    getAllMiembrosProyecto: async (req, res) => {
        try {
            const miembrosProyecto = await MiembrosProyecto.findAll({
                include: [
                    {
                        model: Usuario,
                        attributes: ['nombre', 'email']
                    }
                ]
            });
            res.json(miembrosProyecto);
        } catch (error) {
            console.error('Error al obtener miembros de proyectos:', error);
            res.status(500).send({ message: 'Error al obtener miembros de proyectos' });
        }
    },

    getMiembrosByProyectoId: async (req, res) => {
        try {
            const miembrosProyecto = await MiembrosProyecto.findAll({
                where: { id_proyecto: req.params.id_proyecto },
                include: [
                    {
                        model: Usuario,
                        as: 'usuario',
                        attributes: ['nombre', 'email']
                    }
                ]
            });
            res.json(miembrosProyecto);
        } catch (error) {
            console.error('Error al obtener miembros del proyecto:', error);
            res.status(500).send({ message: 'Error al obtener miembros del proyecto' });
        }
    },

    getMiembrosProyectoById: async (req, res) => {
        try {
            const miembroProyecto = await MiembrosProyecto.findOne({
                where: {
                    id_usuario: req.params.id_usuario,
                    id_proyecto: req.params.id_proyecto
                },
                include: [
                    {
                        model: Usuario,
                        attributes: ['nombre', 'email']
                    }
                ]
            });
            if (miembroProyecto) {
                res.json(miembroProyecto);
            } else {
                res.status(404).send({ message: 'Miembro del proyecto no encontrado' });
            }
        } catch (error) {
            console.error('Error al obtener miembro del proyecto:', error);
            res.status(500).send({ message: 'Error al obtener miembro del proyecto' });
        }
    },

    createMiembroProyecto: async (req, res) => {
        try {
            const miembroProyecto = await MiembrosProyecto.create(req.body);
            res.status(201).json(miembroProyecto);
        } catch (error) {
            console.error('Error al crear miembro del proyecto:', error);
            res.status(500).send({ message: 'Error al crear miembro del proyecto' });
        }
    },

    deleteMiembroProyecto: async (req, res) => {
        try {
            const result = await MiembrosProyecto.destroy({
                where: {
                    id_usuario: req.params.id_usuario,
                    id_proyecto: req.params.id_proyecto
                }
            });
            if (result) {
                res.send({ message: 'Miembro del proyecto eliminado' });
            } else {
                res.status(404).send({ message: 'Miembro del proyecto no encontrado' });
            }
        } catch (error) {
            console.error('Error al eliminar miembro del proyecto:', error);
            res.status(500).send({ message: 'Error al eliminar miembro del proyecto' });
        }
    }
};

module.exports = miembrosProyectoController;
