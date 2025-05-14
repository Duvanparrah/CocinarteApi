const express = require('express');
const AdministradorController = require('../controller/adminController');
const errorHandler = require('../middleware/errorHandler');
const verificarToken = require('../middleware/verificarToken'); // ← aquí importas el middleware

const router = express.Router();

// Ruta para login del administrador (sin token porque es pública)
router.post('/login', AdministradorController.login);

// Ruta protegida (solo accesible si el token es válido)
router.get('/perfil', verificarToken, (req, res) => {
  res.json({ mensaje: 'Hola administrador, esta es tu ruta protegida' });
});

// Middleware de manejo de errores
router.use(errorHandler);

module.exports = router;
