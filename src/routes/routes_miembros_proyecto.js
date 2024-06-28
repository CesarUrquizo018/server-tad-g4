const express = require('express');
const router = express.Router();
const miembrosProyectoController = require('../controllers/controllers_miembros_proyecto');

router.get('/', miembrosProyectoController.getAllMiembrosProyecto);
router.get('/:id_proyecto', miembrosProyectoController.getMiembrosByProyectoId); // Ruta ajustada
router.get('/:id_usuario/:id_proyecto', miembrosProyectoController.getMiembrosProyectoById);
router.post('/', miembrosProyectoController.createMiembroProyecto);
router.delete('/:id_usuario/:id_proyecto', miembrosProyectoController.deleteMiembroProyecto);

module.exports = router;
