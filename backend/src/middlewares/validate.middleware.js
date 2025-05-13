const validateSchema = (schema) => (req, res, next) => {
    console.log("Validando datos:", req.body);
  
    if (!schema) {
      console.error("Error: el esquema de validación está indefinido.");
      return res.status(500).json({ message: "Error interno: esquema de validación no encontrado" });
    }
  
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      console.error("Errores de validación:", parsed.error.format());
      return res.status(400).json({ message: "Error de validación", errors: parsed.error.format() });
    }
  
    next();
  };
  
  module.exports = { validateSchema };
  