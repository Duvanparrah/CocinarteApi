const express = require("express");
const router = express.Router();
const ComidaDiaController = require("../controllers/comidadia.controller");
const { comidaDiaSchema } = require("../schemas/comidadia.shema");
const { validateSchema } = require("../middlewares/validator.middleware");

// Crear una nueva comida del día con validación
router.post("/crear", validateSchema(comidaDiaSchema), ComidaDiaController.create);

// Obtener todas las comidas del día
router.get("/traer", ComidaDiaController.getAll);

// Obtener una comida del día por ID
router.get("/traer/:id", ComidaDiaController.getById);  // Aquí se corrige el nombre del parámetro ID

// Actualizar una comida del día con validación
router.put("/actualizar/:id", validateSchema(comidaDiaSchema), ComidaDiaController.update); // Aquí se agrega "comidadia" en la ruta

// Eliminar una comida del día
router.delete("/eliminar/:id", ComidaDiaController.delete); // Aquí también se agrega "comidadia" en la ruta

module.exports = router;
