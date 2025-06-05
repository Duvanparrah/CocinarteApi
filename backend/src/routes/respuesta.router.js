const express = require('express');
const RespuestaUsuarioPlanController = require('../controllers/respuestusu.controller');
const { validateSchema } = require('../middlewares/validator.middleware');
const { respuestaUsuarioPlanSchema } = require('../schemas/respuesta.shema');
const AuthMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Crear una nueva respuesta (requiere autenticación)
router.post('/crear',AuthMiddleware.auth,validateSchema(respuestaUsuarioPlanSchema),RespuestaUsuarioPlanController.crear);

// Obtener todas las respuestas (opcional - admins)
router.get('/traer',AuthMiddleware.auth,RespuestaUsuarioPlanController.obtenerTodas);

// Obtener respuestas por ID de usuario
router.get('/traer/:id_usuario',AuthMiddleware.auth,RespuestaUsuarioPlanController.obtenerPorUsuario);

// Eliminar una respuesta por ID (puedes agregar middleware de rol si es necesario)
router.delete('/eliminar/:id',AuthMiddleware.auth,RespuestaUsuarioPlanController.eliminar);

module.exports = router;
