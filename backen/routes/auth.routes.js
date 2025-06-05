const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/auth.controllers'); // Asegúrate de ajustar la ruta
const authController = require("../controllers/auth.controllers");
const validarToken = require("../middelwares/auth.middelwares");

router.post('/', usuarioController.crearUsuario);
router.get('/', usuarioController.obtenerUsuarios);
router.get('/:id', usuarioController.obtenerUsuarioPorId);
router.put('/:id', usuarioController.actualizarUsuario);
router.delete('/:id', usuarioController.eliminarUsuario);

//Rutas para Login
router.post("/login", authController.login);
router.post("/logout", validarToken, usuarioController.logout);



module.exports = router;
