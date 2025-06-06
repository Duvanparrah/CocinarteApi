const { Op } = require('sequelize');
const Receta = require('../models/receta');
const Ingrediente = require('../models/ingredientes');

class RecetaController {
  static async obtenerTodasLasRecetas(req, res) {
    try {
      const { nombre, categoria, tiempoMax, dificultad } = req.query;

      let filtro = {};

      if (nombre) {
        filtro.nombre = { [Op.like]: `%${nombre}%` };
      }

      if (categoria) {
        filtro.categoria = categoria;
      }

      if (tiempoMax) {
        filtro.tiempo = { [Op.lte]: parseInt(tiempoMax) };
      }

      if (dificultad) {
        filtro.dificultad = dificultad;
      }

      const recetas = await Receta.findAll({
        where: filtro,
        include: [{ model: Ingrediente }]
      });

      res.status(200).json(recetas);
    } catch (error) {
      console.error('Error al obtener recetas:', error);
      res.status(500).json({ mensaje: 'Error al obtener recetas' });
    }
  }

  static async editarReceta(req, res) {
    try {
      const { id } = req.params;
      const datosActualizados = req.body;

      const receta = await Receta.findByPk(id);
      if (!receta) {
        return res.status(404).json({ mensaje: 'Receta no encontrada' });
      }

      await receta.update(datosActualizados);

      res.status(200).json({ mensaje: 'Receta actualizada', receta });
    } catch (error) {
      console.error('Error al editar la receta:', error);
      res.status(500).json({ mensaje: 'Error al editar la receta' });
    }
  }

  static async publicarReceta(req, res) {
    try {
      const { id } = req.params;
      const receta = await Receta.findByPk(id);

      if (!receta) {
        return res.status(404).json({ mensaje: 'Receta no encontrada' });
      }

      receta.publicada = !receta.publicada;
      await receta.save();

      res.status(200).json({
        mensaje: `Receta ${receta.publicada ? 'publicada' : 'ocultada'} correctamente.`,
        receta,
      });
    } catch (error) {
      console.error('Error al cambiar el estado de la receta:', error);
      res.status(500).json({ mensaje: 'Error al cambiar el estado de la receta' });
    }
  }
}

module.exports = RecetaController;
