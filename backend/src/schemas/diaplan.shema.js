const { z } = require("zod");

// Esquema para validar el día y su semana en el plan nutricional
const diaPlanNutricionalSchema = z.object({
  id_semana: z
    .number({
      required_error: "El ID de la semana es obligatorio",
      invalid_type_error: "El ID de la semana debe ser un número",
    })
    .int()
    .positive({ message: "El ID de la semana debe ser un número entero positivo" }),
  
  nombre_dia: z
    .string({
      required_error: "El nombre del día es obligatorio",
    })
    .refine(value =>
      ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].includes(value), {
      message: "El nombre del día debe ser uno de: Lunes, Martes, Miércoles, Jueves, Viernes, Sábado, Domingo"
    })
});

module.exports = { diaPlanNutricionalSchema };
