const Usuario = require('../models/model_usuario');
const bcrypt = require('bcrypt');

const usuarioController = {
    getAllUsuarios: async (req, res) => {
        try {
            const usuarios = await Usuario.findAll();
            res.json(usuarios);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).send({ message: 'Error al obtener los usuarios' });
        }
    },

    getUsuarioById: async (req, res) => {
        try {
            const usuario = await Usuario.findByPk(req.params.id);
            if (usuario) {
                res.json(usuario);
            } else {
                res.status(404).send({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
            res.status(500).send({ message: 'Error al obtener el usuario' });
        }
    },

    createUsuario: async (req, res) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.contrasena, 10);
            const usuario = await Usuario.create({ ...req.body, contrasena: hashedPassword });
            res.status(201).json(usuario);
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            res.status(500).send({ message: 'Error al crear el usuario' });
        }
    },

    updateUsuario: async (req, res) => {
        try {
            const usuario = await Usuario.findByPk(req.params.id);
            if (usuario) {
                await usuario.update(req.body);
                res.json(usuario);
            } else {
                res.status(404).send({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            res.status(500).send({ message: 'Error al actualizar el usuario' });
        }
    },

    deleteUsuario: async (req, res) => {
        try {
            const result = await Usuario.destroy({
                where: { id_usuario: req.params.id }
            });
            if (result) {
                res.send({ message: 'Usuario eliminado' });
            } else {
                res.status(404).send({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            res.status(500).send({ message: 'Error al eliminar el usuario' });
        }
    }
};

module.exports = usuarioController;