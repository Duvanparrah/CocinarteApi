const { z } = require('zod');

const ingredientePersonalizadoSchema = z.object({
  id_plan: z.number().int().min(1, "El ID del plan es obligatorio y debe ser un número entero positivo"),
  id_ingrediente: z.number().int().min(1, "El ID del ingrediente es obligatorio y debe ser un número entero positivo")
});

module.exports = { ingredientePersonalizadoSchema };
