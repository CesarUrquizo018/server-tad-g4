const express = require('express');
const router = express.Router();
const anotacionControllers = require('../controllers/controllers_anotacion');

router.get('/', anotacionControllers.getAllAnotaciones);
router.get('/:id', anotacionControllers.getAnotacionById);
router.post('/', anotacionControllers.createAnotacion);
router.put('/:id', anotacionControllers.updateAnotacion);
router.delete('/:id', anotacionControllers.deleteAnotacion);
router.get('/proyecto/:id_proyecto', anotacionControllers.getAnotacionesByProyectoId);

module.exports = router;