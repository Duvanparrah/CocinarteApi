const express = require("express");
const router = express.Router();
const DiaPlanController = require("../controllers/diaplan.controller");
const { validateSchema } = require("../middlewares/validator.middleware.js");
const { diaPlanNutricionalSchema } = require("../schemas/diaplan.shema.js"); // Esquema de validación
const AuthMiddleware = require("../middlewares/auth.middleware.js");  // Middleware de autenticación, si es necesario

// Crear un nuevo día del plan
router.post("/crear", AuthMiddleware.auth, validateSchema(diaPlanNutricionalSchema), DiaPlanController.create);  // Requiere autenticación y validación

// Obtener todos los días del plan
router.get("/traer", DiaPlanController.getAll);  // No requiere autenticación (si necesitas, puedes agregarla)

// Obtener un día del plan por ID
router.get("/traer/:id", DiaPlanController.getById);  // No requiere autenticación (si necesitas, puedes agregarla)

// Actualizar un día del plan por ID
router.put("/actualizar/:id", AuthMiddleware.auth, validateSchema(diaPlanNutricionalSchema), DiaPlanController.update);  // Requiere autenticación y validación

// Eliminar un día del plan por ID
router.delete("/eliminar/:id", AuthMiddleware.auth, DiaPlanController.delete);  // Requiere autenticación

module.exports = router;
