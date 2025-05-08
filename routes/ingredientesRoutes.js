const express = require("express");
const router = express.Router();

const {
  buscarPorNombre,
  buscarPorCategoria
} = require("../controller/ingredientesController");

// Ruta: Buscar ingredientes por nombre (parcial)
router.get("/buscar/nombre", buscarPorNombre);

// Ruta: Buscar ingredientes por categoría (exacta)
router.get("/buscar/categoria", buscarPorCategoria);

module.exports = router;
