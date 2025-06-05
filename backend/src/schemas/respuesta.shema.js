const { z } = require("zod");

const respuestaUsuarioPlanSchema = z.object({
  id_usuario: z
    .number({
      required_error: "El ID del usuario es obligatorio",
    })
    .int("El ID debe ser un número entero")
    .positive("El ID del usuario debe ser positivo"),

  id_plan: z
    .number({
      required_error: "El ID del plan es obligatorio",
    })
    .int("El ID del plan debe ser un número entero")
    .positive("El ID del plan debe ser positivo"),

  edad: z
    .number({
      required_error: "La edad es obligatoria",
    })
    .int("La edad debe ser un número entero")
    .min(5, { message: "La edad mínima es 5 años" })
    .max(120, { message: "La edad máxima es 120 años" }),

  sexo: z
    .enum(["hombre", "mujer"], {
      required_error: "El sexo es obligatorio",
      invalid_type_error: "El sexo debe ser 'hombre' o 'mujer'",
    }),

  altura_cm: z
    .number({
      required_error: "La altura es obligatoria",
    })
    .min(30, { message: "Altura mínima permitida: 30 cm" })
    .max(300, { message: "Altura máxima permitida: 300 cm" }),

  peso_kg: z
    .number({
      required_error: "El peso es obligatorio",
    })
    .min(2, { message: "Peso mínimo permitido: 2 kg" })
    .max(400, { message: "Peso máximo permitido: 400 kg" }),

  nivel_actividad: z.enum(
    [
      "sedentario",
      "ligera actividad",
      "moderadamente activo",
      "muy activo",
      "extremadamente activo",
    ],
    {
      required_error: "El nivel de actividad es obligatorio",
      invalid_type_error: "Nivel de actividad no válido",
    }
  ),

  entrenamiento_fuerza: z
    .boolean({
      required_error: "Debes especificar si haces entrenamiento de fuerza",
    }),

  fecha_respuesta: z
    .string()
    .datetime("Formato de fecha inválido")
    .optional(), // Puede ser opcional, ya que puede tener valor por defecto en el modelo
});

module.exports = { respuestaUsuarioPlanSchema };
