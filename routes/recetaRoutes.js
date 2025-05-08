// routes/recetasRoutes.js
const express = require('express');
const router = express.Router();
const RecetasController = require('../controller/recetasController');

// Rutas para las recetas
router.get('/recetas', RecetasController.obtenerTodas);
router.post('/recetas', RecetasController.crearReceta);
router.get('/recetas/buscar', RecetasController.buscarPorNombre);

module.exports = router;
