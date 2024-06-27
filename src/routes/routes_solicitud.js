//src/routes/routes_solicitud
const express = require('express');
const router = express.Router();
const solicitudControllers = require('../controllers/controllers_solicitud');
const auth = require('../middleware/auth');

// Rutas para operaciones CRUD de Solicitudes
router.get('/', solicitudControllers.getAllSolicitudes);
router.get('/:id', auth, solicitudControllers.getSolicitudById);
router.post('/', auth, solicitudControllers.createSolicitud);
router.put('/:id', auth, solicitudControllers.updateSolicitud);
router.delete('/:id', auth, solicitudControllers.deleteSolicitud);
router.get('/proyecto/:id_proyecto', auth, solicitudControllers.getSolicitudesByProyectoId);
router.post('/:id/accept', auth, solicitudControllers.acceptSolicitud);  // Nueva ruta para aceptar solicitud
router.post('/:id/reject', auth, solicitudControllers.rejectSolicitud);  // Nueva ruta para rechazar solicitud
router.get('/recibidas', auth, solicitudControllers.obtenerSolicitudesRecibidas); // Nueva ruta para obtener solicitudes recibidas
router.get('/enviadas', auth, solicitudControllers.obtenerSolicitudesEnviadas); // Nueva ruta para obtener solicitudes enviadas

module.exports = router;
