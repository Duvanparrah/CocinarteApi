const express = require('express');
const router = express.Router();
const IngredientePorComidaController = require('../controllers/ingrediente.comida.controller');
const { validateSchema } = require('../middlewares/validator.middleware');
const { ingredientePorComidaSchema } = require('../schemas/ingredientecomida.shema');

// Crear un nuevo ingrediente por comida
router.post('/crear', validateSchema(ingredientePorComidaSchema), IngredientePorComidaController.create);

// Obtener todos los ingredientes por comida
router.get('/traer', IngredientePorComidaController.getAll);

// Obtener un ingrediente por su ID
router.get('/:id', IngredientePorComidaController.getById);

// Actualizar un ingrediente por su ID
router.put('/:id', validateSchema(ingredientePorComidaSchema), IngredientePorComidaController.update);

// Eliminar un ingrediente por su ID
router.delete('/:id', IngredientePorComidaController.delete);

module.exports = router;
