const express = require("express");
const router = express.Router();

const PlanNutricionalController = require("../controllers/plan.controller");
const { validateSchema } = require("../middlewares/validator.middleware");
const {  planNutricionalSchema } = require("../schemas/plannutricion.shema");

// Crear un nuevo plan nutricional
router.post("/crear", validateSchema(planNutricionalSchema), PlanNutricionalController.create);

// Obtener todos los planes nutricionales
router.get("/listar", PlanNutricionalController.getAll);

// Obtener un plan nutricional por ID
router.get("/:id", PlanNutricionalController.getById);

// Actualizar un plan nutricional por ID
router.put("/:id", validateSchema(planNutricionalSchema), PlanNutricionalController.update);

// Eliminar un plan nutricional por ID
router.delete("/:id", PlanNutricionalController.delete);

module.exports = router;
