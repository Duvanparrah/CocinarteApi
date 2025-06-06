const express = require('express');
const router = express.Router();
const UsuarioController = require('../controller/usuarioController');

// Rutas para los usuarios
router.post('/usuarios', UsuarioController.agregarUsuario); // Crear usuario
router.put('/usuarios/:id', UsuarioController.editarUsuario); // Editar usuario
router.delete('/usuarios/:id', UsuarioController.eliminarUsuario); // Eliminar usuario
router.get('/usuarios', UsuarioController.listarUsuarios); // Obtener todos los usuarios
router.put('/usuarios/suspender/:id', UsuarioController.suspenderUsuario); // Suspender usuario

module.exports = router;


