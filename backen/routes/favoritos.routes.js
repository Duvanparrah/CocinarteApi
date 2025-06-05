const express = require("express");
const router = express.Router();
const FavoritoController = require("../controllers/favoritos.controllers");

router.get("/favoritos", FavoritoController.obtenerFavoritos);
router.post("/favoritos", FavoritoController.agregarFavorito);
router.delete("/favoritos/:id", FavoritoController.eliminarFavorito);

module.exports = router;
