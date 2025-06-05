const { z } = require("zod");

// Expresión regular para validar formato YYYY-MM-DD
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

// Validación del esquema
const planNutricionalSemanalSchema = z.object({
  id_plan: z.number().int().positive({ message: "El ID del plan debe ser un número positivo" }),

  fecha_inicio: z.string()
    .regex(dateRegex, { message: "La fecha de inicio debe tener el formato YYYY-MM-DD" })
    .refine((val) => !isNaN(Date.parse(val)), { message: "La fecha de inicio no es válida" }),

  fecha_fin: z.string()
    .regex(dateRegex, { message: "La fecha de fin debe tener el formato YYYY-MM-DD" })
    .refine((val) => !isNaN(Date.parse(val)), { message: "La fecha de fin no es válida" }),

  calorias_dia: z.number().int().positive({ message: "Las calorías deben ser un número positivo" }),
  proteinas_dia: z.number().positive({ message: "Las proteínas deben ser un número positivo" }),
  grasas_dia: z.number().positive({ message: "Las grasas deben ser un número positivo" }),
  carbohidratos_dia: z.number().positive({ message: "Los carbohidratos deben ser un número positivo" }),
  agua_dia_litros: z.number().positive({ message: "El agua debe ser un número positivo" })
}).superRefine((data, ctx) => {
  if (new Date(data.fecha_fin) <= new Date(data.fecha_inicio)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "La fecha de fin debe ser posterior a la fecha de inicio",
      path: ["fecha_fin"],
    });
  }
});

module.exports = { planNutricionalSemanalSchema };
