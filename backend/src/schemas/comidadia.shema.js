const { z } = require("zod");

const comidaDiaSchema = z.object({
  id_dia: z
    .number({
      required_error: "El ID del día es obligatorio",
    })
    .int("El ID del día debe ser un número entero"),

  tipo_comida: z
    .enum(["Desayuno", "Almuerzo", "Cena", "Snack"], {
      required_error: "El tipo de comida es obligatorio",
    }),

  kcal: z
    .number({
      required_error: "Las calorías (kcal) son obligatorias",
    })
    .int("Las calorías deben ser un número entero"),

  proteinas: z
    .number({
      required_error: "Las proteínas son obligatorias",
    })
    .nonnegative("Las proteínas no pueden ser negativas"),

  carbohidratos: z
    .number({
      required_error: "Los carbohidratos son obligatorios",
    })
    .nonnegative("Los carbohidratos no pueden ser negativos"),

  grasas: z
    .number({
      required_error: "Las grasas son obligatorias",
    })
    .nonnegative("Las grasas no pueden ser negativas"),
});

module.exports = { comidaDiaSchema };
