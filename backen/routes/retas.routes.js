const express = require("express");
const router = express.Router();
const recetasController = require("../controllers/recetas.controllers");
const validarToken = require("../middelwares/auth.middelwares");

// Protegemos todas las rutas con el middleware
router.use(validarToken);

router.get("/recetas", recetasController.obtenerRecetas);
router.get("/:id_receta", recetasController.obtenerRecetaPorId);
router.post("/recetas", recetasController.crearReceta);
router.put("/:id_receta", recetasController.editarReceta);
router.delete("/:id_receta", recetasController.eliminarReceta);

module.exports = router;
