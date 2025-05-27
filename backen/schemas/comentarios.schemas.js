const { body } = require("express-validator");

const comentarioSchema = [
    body("usuario_id").isInt().withMessage("El usuario_id debe ser un número entero."),
    body("receta_id").isInt().withMessage("El receta_id debe ser un número entero."),
    body("contenido").notEmpty().withMessage("El contenido no puede estar vacío.")
];

module.exports = comentarioSchema; // ✅ Exportación correcta
