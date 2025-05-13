const { z } = require("zod");

// Esquema de validación para crear o actualizar un plan nutricional
const planNutricionalSchema = z.object({
  nombre_plan: z
    .string({
      required_error: "El nombre del plan es obligatorio",
    })
    .min(3, {
      message: "El nombre del plan debe tener al menos 3 caracteres",
    })
    .max(100, {
      message: "El nombre del plan no puede exceder los 100 caracteres",
    }),

  descripcion: z
    .string({
      required_error: "La descripción es obligatoria",
    })
    .min(10, {
      message: "La descripción debe tener al menos 10 caracteres",
    })
    .max(1000, {
      message: "La descripción no puede exceder los 1000 caracteres",
    }),

  objetivo: z
    .enum(["bajar de peso", "mantener peso", "ganar músculo"], {
      message: "El objetivo debe ser 'bajar de peso', 'mantener peso' o 'ganar músculo'",
    })
    ,

  calorias: z
    .number({
      required_error: "Las calorías son obligatorias",
    })
    .int("Las calorías deben ser un número entero")
    .min(100, {
      message: "Las calorías deben ser al menos 100",
    })
    .max(5000, {
      message: "Las calorías no pueden ser mayores a 5000",
    }),

  proteinas: z
    .number()
    .min(0, {
      message: "Las proteínas no pueden ser un valor negativo",
    })
    .default(0),

  grasas: z
    .number()
    .min(0, {
      message: "Las grasas no pueden ser un valor negativo",
    })
    .default(0),

  carbohidratos: z
    .number()
    .min(0, {
      message: "Los carbohidratos no pueden ser un valor negativo",
    })
    .default(0),

  azucar_total: z
    .number()
    .min(0, {
      message: "El azúcar no puede ser un valor negativo",
    })
    .default(0),

  comidas_por_dia: z
    .number({
      required_error: "El número de comidas por día es obligatorio",
    })
    .int("El número de comidas por día debe ser un valor entero")
    .min(1, {
      message: "El número de comidas por día debe ser al menos 1",
    })
    .max(10, {
      message: "El número de comidas por día no puede exceder las 10",
    })
    .default(3),

  id_usuario: z
    .number({
      required_error: "El ID del usuario es obligatorio",
    })
    .int("El ID del usuario debe ser un número entero")
    .min(1, {
      message: "El ID del usuario debe ser un valor positivo",
    }),
});

module.exports = { planNutricionalSchema };
