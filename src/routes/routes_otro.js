const express = require('express');
const router = express.Router();
const otroControllers = require('../controllers/controllers_otro');

router.get('/', otroControllers.getAllOtros);
router.get('/:id', otroControllers.getOtroById);
router.post('/', otroControllers.createOtro);
router.put('/:id', otroControllers.updateOtro);
router.delete('/:id', otroControllers.deleteOtro);
router.get('/proyecto/:id_proyecto', otroControllers.getOtrosByProyectoId);

module.exports = router;