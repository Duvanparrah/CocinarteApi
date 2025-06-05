const { z } = require("zod");

// Esquema de validación para el Tipo de Plan
const tipoPlanSchema = z.object({
  nombre_plan: z
    .string({
      required_error: "El nombre del plan es obligatorio",
    })
    .min(3, {
      message: "El nombre del plan debe tener al menos 3 caracteres",
    }),
  descripcion: z
    .string({
      required_error: "La descripción del plan es obligatoria",
    })
    .min(10, {
      message: "La descripción debe tener al menos 10 caracteres",
    }),
  duracion_dias: z
    .number({
      required_error: "La duración en días es obligatoria",
    })
    .int()
    .positive({
      message: "La duración debe ser un número positivo",
    }),
  precio: z
    .number({
      required_error: "El precio es obligatorio",
    })
    .min(0, {
      message: "El precio no puede ser negativo",
    }),
});

module.exports = { tipoPlanSchema };
