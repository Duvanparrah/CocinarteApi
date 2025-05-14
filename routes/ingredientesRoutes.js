const express = require('express');
const router = express.Router();
const IngredientesController = require('../controller/ingredientesController'); // Asegúrate de que la ruta esté correcta
const errorHandler = require('../middleware/errorHandler'); // Middleware para manejar errores
const upload = require('../middleware/uploadMiddleware'); // Middleware para manejar la subida de archivos

// Ruta para crear un ingrediente
router.post('/', IngredientesController.crearIngrediente);

// Ruta para buscar ingredientes por nombre
router.get('/buscar', IngredientesController.buscarIngredientes);

// Ruta para actualizar un ingrediente por ID
router.put('/:id_ingrediente', IngredientesController.actualizarIngrediente);

// Ruta para subir imagen de ingrediente
router.post('/upload-image', upload.single('imagen'), IngredientesController.subirImagen); // Multer para subir imagen

// Middleware de manejo de errores
router.use(errorHandler);

module.exports = router;

