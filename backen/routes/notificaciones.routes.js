const express = require("express");
const router = express.Router();
const NotificacionController = require("../controllers/notificaciones.controllers");

router.get("/notificaciones", NotificacionController.obtenerNotificaciones);
router.post("/notificaciones", NotificacionController.crearNotificacion);
router.put("/notificaciones/:id", NotificacionController.marcarLeida);
router.delete("/notificaciones/:id", NotificacionController.eliminarNotificacion);

module.exports = router;
