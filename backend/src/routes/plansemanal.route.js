const express = require("express");
const router = express.Router();
const PlanNutricionalSemanalController = require("../controllers/plansemanal.controller");
const { validateSchema } = require("../middlewares/validate.middleware");
const { planNutricionalSemanalSchema } = require("../schemas/plansemanal.shema"); // ✅ Corrección del nombre del archivo

// ✅ Crear una nueva semana
router.post("/crear", validateSchema(planNutricionalSemanalSchema), PlanNutricionalSemanalController.create);

// ✅ Obtener todas las semanas
router.get("/traer", PlanNutricionalSemanalController.getAll);

// ✅ Obtener una semana por ID
router.get("/:id", PlanNutricionalSemanalController.getById);

// ✅ Actualizar una semana por ID
router.put("/:id", validateSchema(planNutricionalSemanalSchema), PlanNutricionalSemanalController.update);

// ✅ Eliminar una semana por ID
router.delete("/:id", PlanNutricionalSemanalController.delete);

module.exports = router;
