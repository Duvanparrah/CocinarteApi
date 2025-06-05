const express = require("express");
const router = express.Router({ mergeParams: true });
const likesController = require("../controllers/like.controllers");
const validarToken = require("../middelwares/auth.middelwares");

router.use(validarToken);

// POST /recetas/:receta_id/like → da like
router.post("/recetas/:receta_id/like", likesController.darLike);

// DELETE /recetas/:receta_id/like → quita like
router.delete("/:receta_id/like", likesController.quitarLike);

// GET /recetas/:receta_id/likes → cuenta likes
router.get("/:receta_id/likes", likesController.contarLikes);

// GET /recetas/:receta_id/like → verifica si el usuario dio like
router.get("/:receta_id/like", likesController.verificarLike);

module.exports = router;
