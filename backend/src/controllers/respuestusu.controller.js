const RespuestaUsuarioPlan = require('../models/respuestausu.model');
const { respuestaUsuarioPlanSchema } = require('../schemas/respuesta.shema');
const { ZodError } = require('zod');

class RespuestaUsuarioPlanController {
  // Crear una nueva respuesta
  static async crear(req, res) {
    try {
      // Validar datos del body
      const datosValidados = respuestaUsuarioPlanSchema.parse(req.body);

      // Crear en la base de datos
      const nuevaRespuesta = await RespuestaUsuarioPlan.create(datosValidados);

      return res.status(201).json({
        message: 'Respuesta creada correctamente',
        data: nuevaRespuesta
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Error de validación",
          errores: error.errors
        });
      }

      console.error("Error al crear la respuesta:", error);
      return res.status(500).json({
        message: 'Error interno al crear la respuesta',
        error: error.message
      });
    }
  }

  // Obtener todas las respuestas
  static async obtenerTodas(req, res) {
    try {
      const respuestas = await RespuestaUsuarioPlan.findAll();
      return res.status(200).json({ data: respuestas });
    } catch (error) {
      console.error("Error al obtener respuestas:", error);
      return res.status(500).json({
        message: 'Error al obtener respuestas',
        error: error.message
      });
    }
  }

  // Obtener respuestas por ID de usuario
  static async obtenerPorUsuario(req, res) {
    const { id_usuario } = req.params;
    try {
      const respuestas = await RespuestaUsuarioPlan.findAll({ where: { id_usuario } });
      return res.status(200).json({ data: respuestas });
    } catch (error) {
      console.error("Error al obtener respuestas por usuario:", error);
      return res.status(500).json({
        message: 'Error al obtener respuestas del usuario',
        error: error.message
      });
    }
  }

  // Eliminar una respuesta por ID
  static async eliminar(req, res) {
    const { id } = req.params;
    try {
      const respuesta = await RespuestaUsuarioPlan.findByPk(id);
      if (!respuesta) {
        return res.status(404).json({ message: 'Respuesta no encontrada' });
      }

      await respuesta.destroy();
      return res.status(200).json({ message: 'Respuesta eliminada con éxito' });
    } catch (error) {
      console.error("Error al eliminar respuesta:", error);
      return res.status(500).json({
        message: 'Error al eliminar la respuesta',
        error: error.message
      });
    }
  }
}

module.exports = RespuestaUsuarioPlanController;
