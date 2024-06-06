const Proyecto = require('../models/model_proyecto');
const Usuario = require('../models/model_usuario');
const MiembrosProyecto = require('../models/model_miembros_proyecto');

const proyectoController = {
    // Obtener todos los proyectos (para HomePage)
    getAllProyectos: async (req, res) => {
        try {
            const proyectos = await Proyecto.findAll({
                include: [Usuario]
            });
            res.json(proyectos);
        } catch (error) {
            console.error('Error al obtener proyectos:', error);
            res.status(500).send({ message: 'Error al obtener los proyectos' });
        }
    },

    // Obtener proyecto por ID (para el buscador, HomePage)
    getProyectoById: async (req, res) => {
        try {
            const proyecto = await Proyecto.findByPk(req.params.id, {
                include: [Usuario]
            });
            if (proyecto) {
                res.json(proyecto);
            } else {
                res.status(404).send({ message: 'Proyecto no encontrado' });
            }
        } catch (error) {
            console.error('Error al obtener el proyecto:', error);
            res.status(500).send({ message: 'Error al obtener el proyecto' });
        }
    },

    // Obtener proyectos por Usuario (para MyProjectsPage)
    getProyectosByUsuario: async (req, res) => {
        const { usuarioId } = req.params;
    
        if (!usuarioId) {
            return res.status(400).json({ message: 'ID de usuario no proporcionado.' });
        }
    
        try {
            const proyectos = await Proyecto.findAll({
                where: { id_usuario: usuarioId }
            });
    
            return res.status(200).json(proyectos);
        } catch (error) {
            console.error('Error al obtener los proyectos:', error);
            return res.status(500).json({ message: 'Error al obtener los proyectos.' });
        }
    },    

    // Crear proyecto (para MyProjectsPage)
    createProyecto: async (req, res) => {
        try {
            const proyecto = await Proyecto.create(req.body);
            await MiembrosProyecto.create({ id_usuario: req.body.id_usuario, id_proyecto: proyecto.id_proyecto });
            res.status(201).json(proyecto);
        } catch (error) {
            console.error('Error al crear el proyecto:', error);
            res.status(500).send({ message: 'Error al crear el proyecto' });
        }
    },

    // Editar proyecto (para MyProjectsPage)
    updateProyecto: async (req, res) => {
        try {
            const proyecto = await Proyecto.findByPk(req.params.id);
            if (proyecto) {
                await proyecto.update(req.body);
                res.json(proyecto);
            } else {
                res.status(404).send({ message: 'Proyecto no encontrado' });
            }
        } catch (error) {
            console.error('Error al actualizar el proyecto:', error);
            res.status(500).send({ message: 'Error al actualizar el proyecto' });
        }
    },

    // Borrar proyecto (para MyProjectPage)
    deleteProyecto: async (req, res) => {
        try {
            const result = await Proyecto.destroy({
                where: { id_proyecto: req.params.id }
            });
            if (result) {
                res.send({ message: 'Proyecto eliminado' });
            } else {
                res.status(404).send({ message: 'Proyecto no encontrado' });
            }
        } catch (error) {
            console.error('Error al eliminar el proyecto:', error);
            res.status(500).send({ message: 'Error al eliminar el proyecto' });
        }
    },
};

module.exports = proyectoController;
