const { z } = require("zod");

const likeSchema = z.object({
    usuario_id: z.number().int().positive({ message: "El usuario_id debe ser un número positivo." }),
    receta_id: z.number().int().positive({ message: "El receta_id debe ser un número positivo." })
});

module.exports = likeSchema;
