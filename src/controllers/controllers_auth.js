//src/controllers_auth
const Usuario = require('../models/model_usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authControllers = {
    login: async (req, res) => {
        const { email, contrasena } = req.body;

        if (!email || !contrasena) {
            return res.status(400).json({ message: 'Por favor, proporciona un correo electrónico y una contraseña.' });
        }

        try {
            const usuario = await Usuario.findOne({ where: { email } });
            if (!usuario) {
                return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos.' });
            }

            const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);
            if (!isMatch) {
                return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos.' });
            }

            const token = jwt.sign({ userId: usuario.id_usuario }, 'tu_secreto_jwt', { expiresIn: '1h' });
            return res.status(200).json({ token, usuario, message: 'Inicio de sesión exitoso.' });
        } catch (error) {
            console.error('Error al validar el usuario:', error);
            return res.status(500).json({ message: 'Error al procesar la solicitud.' });
        }
    },

    register: async (req, res) => {
        const { nombre, codigo, email, contrasena, foto_perfil } = req.body;
        console.log("Datos recibidos para el registro: ", { nombre, codigo, email, contrasena, foto_perfil });

        try {
            const hashedPassword = await bcrypt.hash(contrasena, 10);
            const nuevoUsuario = await Usuario.create({
                nombre,
                codigo,
                email,
                contrasena: hashedPassword,
                foto_perfil
            });
            console.log("Usuario creado exitosamente: ", nuevoUsuario);

            return res.status(200).json({ message: 'Usuario creado exitosamente.', usuario: nuevoUsuario });
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            return res.status(500).json({ message: 'Error al crear el usuario.' });
        }
    }
}

module.exports = authControllers;
