//src/controllers_miembros_proyecto
const MiembrosProyecto = require('../models/model_miembros_proyecto.js');

const miembrosProyectoController = {
    getAllMiembrosProyecto: async (req, res) => {
        try {
            const miembrosProyecto = await MiembrosProyecto.findAll();
            res.json(miembrosProyecto);
        } catch (error) {
            console.error('Error al obtener miembros de proyectos:', error);
            res.status(500).send({ message: 'Error al obtener miembros de proyectos' });
        }
    },

    getMiembrosProyectoById: async (req, res) => {
        try {
            const miembroProyecto = await MiembrosProyecto.findOne({
                where: {
                    id_usuario: req.params.id_usuario,
                    id_proyecto: req.params.id_proyecto
                }
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
