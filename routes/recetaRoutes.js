const express = require('express');
const { crearReceta, obtenerRecetas, subirImagen } = require('../controller/recetaController');
const errorHandler = require('../middleware/errorHandler');
const upload = require('../middleware/uploadMiddleware'); // Usar el middleware de multer aquí

const router = express.Router();

// Rutas
router.post('/', upload.single('foto'), crearReceta); // 'foto' es el campo del formulario para la imagen
router.get('/', obtenerRecetas);
router.post('/subir-imagen', upload.single('foto'), subirImagen); // Asegúrate de usar upload.single aquí

// Middleware de errores (al final)
router.use(errorHandler);

module.exports = router;
