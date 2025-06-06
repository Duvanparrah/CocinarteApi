// routes/banquetesRoutes.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const BanqueteController = require('../controller/banquetesController');
const upload = require('../middleware/uploadMiddleware');  // Middleware Multer ya configurado
const errorHandler = require('../middleware/errorHandler');

const router = express.Router();

// Definir la ruta de almacenamiento para imágenes de banquetes
const uploadPath = path.join(__dirname, '../uploads/banquetes');

// Crear la carpeta si no existe
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// 📌 Ruta para crear un nuevo banquete (con imagen)
router.post('/crear', upload.single('foto'), BanqueteController.crearBanquete);

// 📌 Ruta para obtener todos los banquetes
router.get('/', BanqueteController.obtenerBanquetes);

// 📌 Ruta para subir solo una imagen (independiente de crear banquete)
router.post('/subir-imagen', upload.single('foto'), BanqueteController.subirImagen);

// 📌 Middleware para manejar errores
router.use(errorHandler);

module.exports = router;
