const { z } = require("zod");

const categoriaSchema = z.object({
    nombre_categoria: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }).max(100, { message: "El nombre no debe exceder los 100 caracteres" }),
    tipo_internacional: z.string().max(100).optional(),
});

module.exports = categoriaSchema;
