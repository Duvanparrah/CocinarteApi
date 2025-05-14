const express = require('express');
const errorHandler = require('../middleware/errorHandler');
const inconsistenciasController = require('../controller/inconsistenciasController');

const router = express.Router();

router.get('/', inconsistenciasController.obtenerInconsistencias);
router.post('/', inconsistenciasController.crearInconsistencia);
router.put('/aprobar/:id', inconsistenciasController.aprobarInconsistencia);
router.put('/rechazar/:id', inconsistenciasController.rechazarInconsistencia);

// Middleware de manejo de errores
router.use(errorHandler);

module.exports = router;

