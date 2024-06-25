const Usuario = require('../models/model_usuario'); // Asegúrate de que la ruta sea correcta
const bcrypt = require('bcryptjs');

async function updatePasswords() {
    try {
        // Obtén todos los usuarios de la base de datos
        const usuarios = await Usuario.findAll();

        for (let usuario of usuarios) {
            // Verifica si la contraseña ya está hasheada (bcrypt hash siempre empieza con $2a$ o $2b$)
            if (!usuario.contrasena.startsWith('$2a$') && !usuario.contrasena.startsWith('$2b$')) {
                // Hashea la contraseña
                const hashedPassword = await bcrypt.hash(usuario.contrasena, 10);
                // Actualiza el usuario con la contraseña hasheada
                usuario.contrasena = hashedPassword;
                await usuario.save();
                console.log(`Contraseña para usuario ${usuario.email} ha sido actualizada.`);
            } else {
                console.log(`La contraseña para usuario ${usuario.email} ya está hasheada.`);
            }
        }
    } catch (error) {
        console.error('Error al actualizar las contraseñas:', error);
    }
}

// Ejecuta la función
updatePasswords();
