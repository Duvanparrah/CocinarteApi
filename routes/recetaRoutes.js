// routes/recetasRoutes.js
const express = require('express');
const router = express.Router();

const { crearReceta, obtenerRecetas, subirImagen } = require('../controller/recetaController');
const errorHandler = require('../middleware/errorHandler');
const upload = require('../middleware/uploadMiddleware'); // multer

// Rutas
router.post('/', upload.single('foto'), crearReceta); // Crear receta con imagen
router.get('/', obtenerRecetas);                      // Obtener todas las recetas
router.post('/subir-imagen', upload.single('foto'), subirImagen); // Subir solo imagen

// Middleware para manejo de errores (al final)
router.use(errorHandler);

module.exports = router;
