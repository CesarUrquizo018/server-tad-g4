const express = require('express');
const router = express.Router();
const usuarioControllers = require('../controllers/controllers_usuario');
const auth = require('../middleware/auth');

// Rutas para operaciones CRUD de Usuarios
router.get('/', auth, usuarioControllers.getAllUsuarios);
router.get('/:id', auth, usuarioControllers.getUsuarioById);
router.post('/', usuarioControllers.createUsuario);
router.put('/:id', auth, usuarioControllers.updateUsuario);
router.delete('/:id', auth, usuarioControllers.deleteUsuario);

module.exports = router;