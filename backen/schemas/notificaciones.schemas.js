const { z } = require("zod");

const notificacionSchema = z.object({
    usuario_id: z.number().int().positive({ message: "El usuario_id debe ser un número positivo." }),
    tipo: z.enum(["Compra Plan", "Comentario", "Like", "Reporte", "Advertencia"], {
        message: "El tipo de notificación no es válido."
    }),
    mensaje: z.string().min(5, { message: "El mensaje debe tener al menos 5 caracteres." }),
    fecha: z.string().datetime().optional(),
    leida: z.boolean().default(false)
});

module.exports = notificacionSchema;
