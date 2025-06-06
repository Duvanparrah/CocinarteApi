const multer = require('multer');

module.exports = (err, req, res, next) => {
  // Manejo de errores específicos de Multer
  if (err instanceof multer.MulterError) {
    // Error por un archivo demasiado grande, por ejemplo
    return res.status(400).json({ mensaje: `Error en la carga del archivo: ${err.message}` });
  }

  // Error general
  if (err) {
    console.error('Error del servidor:', err); // Log del error

    const errorResponse = process.env.NODE_ENV === 'development' 
      ? { 
          mensaje: 'Error del servidor',
          error: err.message,   // Mensaje del error
          stack: err.stack      // Solo en desarrollo, la traza del error
        }
      : { 
          mensaje: 'Error del servidor' // Mensaje simplificado en producción
        };

    // Enviar una respuesta con el error
    return res.status(500).json(errorResponse);
  }

  // Si no hay error, pasa al siguiente middleware
  next();
};
