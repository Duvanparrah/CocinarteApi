const { z } = require("zod");

const recetaSchema = z.object({
    titulo: z.string().min(5, { message: "El título debe tener al menos 5 caracteres" }).max(100, { message: "El título no debe exceder los 100 caracteres" }),
    descripcion: z.string().min(10, { message: "La descripción debe tener al menos 10 caracteres" }),
    id_usuario: z.number().int().positive({ message: "El ID de usuario debe ser un número positivo" }),
    dificultad: z.enum(["Fácil", "Media", "Difícil"]),
    seccion: z.enum(["comunidad", "inicio"]),
});

module.exports = recetaSchema;
