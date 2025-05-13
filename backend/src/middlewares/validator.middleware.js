const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    // Verificamos si error.errors existe y es un arreglo antes de intentar mapearlo
    if (error.errors && Array.isArray(error.errors)) {
      return res
        .status(400)
        .json({ message: error.errors.map((err) => err.message) });
    } else {
      // Si error.errors no existe o no es un arreglo, devolvemos un mensaje genérico de error
      return res.status(400).json({ message: 'Error de validación no esperado' });
    }
  }
};

module.exports = { validateSchema };
