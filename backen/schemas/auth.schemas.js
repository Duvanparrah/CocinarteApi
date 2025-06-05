const { z } = require("zod");

const usuarioSchema = z.object({
    correo: z.string()
        .email({ message: "El correo debe ser válido" })
        .max(255, { message: "El correo no debe superar los 255 caracteres" }),

    contrasena: z.string()
        .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
        .max(255, { message: "La contraseña no debe superar los 255 caracteres" }),

    nombre_usuario: z.string()
        .min(3, { message: "El nombre de usuario debe tener al menos 3 caracteres" })
        .max(100, { message: "El nombre de usuario no debe superar los 100 caracteres" }),

    foto_perfil: z.string()
        .url({ message: "La URL de la foto de perfil debe ser válida" })
        .optional(),

    tipo_usuario: z.enum(["usuario", "administrador", "administrador_lider"])
        .default("usuario"),

    fecha_creacion: z.string()
        .datetime({ message: "La fecha de creación debe tener formato válido" })
        .default(new Date().toISOString()) 
});

module.exports = usuarioSchema;
