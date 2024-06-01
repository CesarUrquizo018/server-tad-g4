const express = require('express');
const router = express.Router();
const estadoSolicitudController = require('../controllers/controllers_estado_solicitud');

router.get('/', estadoSolicitudController.getAllEstados);
router.get('/:id', estadoSolicitudController.getEstadoById);
router.post('/', estadoSolicitudController.createEstado);
router.put('/:id', estadoSolicitudController.updateEstado);
router.delete('/:id', estadoSolicitudController.deleteEstado);

module.exports = router;
