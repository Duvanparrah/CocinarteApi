const express = require('express');
const IngredientesPersonalizadosPlanController = require('../controllers/ingrediente.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');
const { validateSchema } = require('../middlewares/validator.middleware');  // Middleware de validación
const { ingredientePersonalizadoSchema } = require('../schemas/ingredienteper.shema');

const router = express.Router();

// Crear una nueva relación ingrediente-plan
router.post('/crear', AuthMiddleware.auth, validateSchema(ingredientePersonalizadoSchema),IngredientesPersonalizadosPlanController.crear);

// Obtener todas las relaciones ingrediente-plan
router.get('/traer', AuthMiddleware.auth, IngredientesPersonalizadosPlanController.obtenerTodas);

// Obtener relaciones por ID de plan
router.get('/traer/:id_plan', AuthMiddleware.auth, IngredientesPersonalizadosPlanController.obtenerPorPlan);

// Eliminar una relación ingrediente-plan
router.delete('/eliminar/:id_plan/:id_ingrediente', AuthMiddleware.auth, IngredientesPersonalizadosPlanController.eliminar);

module.exports = router;
