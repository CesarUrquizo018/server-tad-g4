const Otro = require('../models/model_otro');

const otroController = {

    getAllOtros: async (req, res) => {
        try {
            const otros = await Otro.findAll();
            res.json(otros);
        } catch (error) {
            console.error('Error al obtener otros:', error);
            res.status(500).send({ message: 'Error al obtener otros' });
        }
    },

    getOtroById: async (req, res) => {
        try {
            const otro = await Otro.findByPk(req.params.id);
            if (otro) {
                res.json(otro);
            } else {
                res.status(404).send({ message: 'Otro no encontrado' });
            }
        } catch (error) {
            console.error('Error al obtener el otro:', error);
            res.status(500).send({ message: 'Error al obtener el otro' });
        }
    },

    createOtro: async (req, res) => {
        try {
            const otro = await Otro.create(req.body);
            res.status(201).json(otro);
        } catch (error) {
            console.error('Error al crear el otro:', error);
            res.status(500).send({ message: 'Error al crear el otro' });
        }
    },

    updateOtro: async (req, res) => {
        try {
            const otro = await Otro.findByPk(req.params.id);
            if (otro) {
                await otro.update(req.body);
                res.json(otro);
            } else {
                res.status(404).send({ message: 'Otro no encontrado' });
            }
        } catch (error) {
            console.error('Error al actualizar el otro:', error);
            res.status(500).send({ message: 'Error al actualizar el otro' });
        }
    },

    deleteOtro: async (req, res) => {
        try {
            const result = await Otro.destroy({
                where: { id_otros: req.params.id }
            });
            if (result) {
                res.send({ message: 'Otro eliminado' });
            } else {
                res.status(404).send({ message: 'Otro no encontrado' });
            }
        } catch (error) {
            console.error('Error al eliminar el otro:', error);
            res.status(500).send({ message: 'Error al eliminar el otro' });
        }
    },

    getOtrosByProyectoId: async (req, res) => {
        try {
            const otros = await Otro.findAll({
                where: { id_proyecto: req.params.id_proyecto }
            });
            res.json(otros);
        } catch (error) {
            console.error('Error al obtener los otros:', error);
            res.status(500).send({ message: 'Error al obtener los otros' });
        }
    }
};

module.exports = otroController;
