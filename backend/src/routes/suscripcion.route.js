const express = require("express");
const SuscripcionesController = require("../controllers/suscripcion.controller");
const AuthMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();


// Obtener todas las suscripciones (solo administradores/líderes)
router.get("/",AuthMiddleware.auth,AuthMiddleware.onlyAdminsOrLeaders,
  SuscripcionesController.obtenerTodas
);

// Obtener suscripciones por ID de usuario
router.get("/:id_usuario",AuthMiddleware.auth,SuscripcionesController.obtenerPorUsuario
);

// Crear nueva suscripción
router.post("/",AuthMiddleware.auth,SuscripcionesController.crear);

// Actualizar suscripción
router.put("/:id",AuthMiddleware.auth,AuthMiddleware.onlyAdminsOrLeaders,SuscripcionesController.actualizar);

// Eliminar suscripción
router.delete("/:id",AuthMiddleware.auth,AuthMiddleware.onlyAdminsOrLeaders,SuscripcionesController.eliminar);

module.exports = router;
