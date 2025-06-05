const express = require("express");
const router = express.Router();
const categoriasController = require("../controllers/categorias.controllers");
const validarToken = require("../middelwares/auth.middelwares");

// Todas las rutas protegidas con token JWT
router.use(validarToken);

router.get("/", categoriasController.obtenerCategorias);
router.get("/:id_categoria", categoriasController.obtenerCategoriaPorId);
router.post("/", categoriasController.crearCategoria);
router.put("/:id_categoria", categoriasController.editarCategoria);
router.delete("/:id_categoria", categoriasController.eliminarCategoria);

module.exports = router;
