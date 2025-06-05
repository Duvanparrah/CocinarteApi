const { z } = require("zod");

// Esquema de validación para el registro
const registerSchema = z.object({
  nombre_usuario: z.string({
    required_error: "El nombre de usuario es obligatorio",
  }).min(3, {
    message: "El nombre de usuario debe tener al menos 3 caracteres",
  }),
  email: z
    .string({
      required_error: "El correo electrónico es obligatorio",
    })
    .email({
      message: "Correo no válido",
    }),
  contraseña: z
    .string({
      required_error: "La contraseña es obligatoria",
    })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
  tipo_usuario: z
    .string({
      required_error: "El tipo de usuario es obligatorio",
    })
    .refine((val) => ["normal", "administrador", "admin_lider"].includes(val), {
      message: "El tipo de usuario debe ser 'normal', 'administrador' o 'admin_lider'",
    })
    .optional(), // Puede ser opcional y el backend asignará "normal" por defecto
});

// Esquema de validación para el login
const loginSchema = z.object({
  email: z
    .string({
      required_error: "El correo electrónico es obligatorio",
    })
    .email({
      message: "Correo no válido",
    }),
  contraseña: z
    .string({
      required_error: "La contraseña es obligatoria",
    })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
});

module.exports = { registerSchema, loginSchema };
