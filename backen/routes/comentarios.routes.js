const express = require("express");
const router = express.Router({ mergeParams: true });
const comentariosController = require("../controllers/comentarios.controllers");
const validarToken = require("../middelwares/auth.middelwares");

router.use(validarToken);

// Rutas para comentarios dentro de una receta específica
router.get("/:receta_id", comentariosController.obtenerComentariosPorReceta);           // GET /recetas/:receta_id/comentarios
router.post("/", comentariosController.crearComentario);                      // POST /recetas/:receta_id/comentarios
router.put("/:receta_id/:id", comentariosController.editarComentario);                   // PUT /recetas/:receta_id/comentarios/:id
router.delete("/:receta_id/:id", comentariosController.eliminarComentario);              // DELETE /recetas/:receta_id/comentarios/:id

module.exports = router;
