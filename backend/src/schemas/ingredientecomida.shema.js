const { z } = require('zod');

const ingredientePorComidaSchema = z.object({
  id_comida: z.number({
    required_error: 'El campo id_comida es obligatorio',
    invalid_type_error: 'El campo id_comida debe ser un número'
  }),

  nombre_ingrediente: z.string({
    required_error: 'El nombre del ingrediente es obligatorio',
    invalid_type_error: 'El nombre del ingrediente debe ser una cadena'
  }).max(100, 'El nombre del ingrediente no puede tener más de 100 caracteres'),

  cantidad: z.string()
    .max(50, 'La cantidad no puede tener más de 50 caracteres')
    .optional()
    .nullable(),

  preparacion: z.string()
    .optional()
    .nullable(),

  calorias: z.number()
    .min(0, 'Las calorías no pueden ser negativas')
    .max(9999999999.99, 'El valor de calorías excede el límite permitido') // DECIMAL(10,2)
    .optional()
    .default(0.00)
});

module.exports = {ingredientePorComidaSchema};
