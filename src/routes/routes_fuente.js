const express = require('express');
const router = express.Router();
const fuentesControllers = require('../controllers/controllers_fuente');

router.get('/', fuentesControllers.getAllFuentes);
router.get('/:id', fuentesControllers.getFuenteById);
router.post('/', fuentesControllers.createFuente);
router.put('/:id', fuentesControllers.updateFuente);
router.delete('/:id', fuentesControllers.deleteFuente);
router.get('/proyecto/:id_proyecto', fuentesControllers.getFuentesByProyectoId);

module.exports = router;