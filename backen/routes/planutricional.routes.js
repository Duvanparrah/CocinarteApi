const express = require("express");
const router = express.Router();
const PlanController = require("../controllers/Planutricional.controllers");

router.get("/planes", PlanController.obtenerPlanes);
router.post("/planes", PlanController.crearPlan);
router.put("/planes/:id", PlanController.actualizarPlan);
router.delete("/planes/:id", PlanController.eliminarPlan);

module.exports = router;
