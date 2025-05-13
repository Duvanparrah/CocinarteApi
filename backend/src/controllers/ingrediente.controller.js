const IngredientesPersonalizadosPlan = require('../models/ingredientesper.model');  // Asegúrate de importar el modelo correcto
const { ZodError } = require('zod');  // Para validaciones si las estás usando

class IngredientesPersonalizadosPlanController {
  // Crear una nueva relación ingrediente-plan
  static async crear(req, res) {
    try {
      const { id_plan, id_ingrediente } = req.body;

      // Crear la relación en la base de datos
      const nuevoIngredientePlan = await IngredientesPersonalizadosPlan.create({
        id_plan,
        id_ingrediente
      });

      return res.status(201).json({
        message: 'Ingrediente agregado al plan correctamente',
        data: nuevoIngredientePlan
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Error al crear la relación',
        error: error.message
      });
    }
  }

  // Obtener todas las relaciones ingrediente-plan
  static async obtenerTodas(req, res) {
    try {
      const ingredientesPlanes = await IngredientesPersonalizadosPlan.findAll();
      return res.status(200).json({ data: ingredientesPlanes });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Error al obtener las relaciones',
        error: error.message
      });
    }
  }

  // Obtener relaciones por ID de plan
  static async obtenerPorPlan(req, res) {
    const { id_plan } = req.params;
    try {
      const ingredientesPlanes = await IngredientesPersonalizadosPlan.findAll({
        where: { id_plan }
      });

      if (!ingredientesPlanes || ingredientesPlanes.length === 0) {
        return res.status(404).json({ message: 'No se encontraron ingredientes para este plan' });
      }

      return res.status(200).json({ data: ingredientesPlanes });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Error al obtener los ingredientes del plan',
        error: error.message
      });
    }
  }

  // Eliminar una relación ingrediente-plan por ID
  static async eliminar(req, res) {
    const { id_plan, id_ingrediente } = req.params;
    try {
      const ingredientePlan = await IngredientesPersonalizadosPlan.findOne({
        where: {
          id_plan,
          id_ingrediente
        }
      });

      if (!ingredientePlan) {
        return res.status(404).json({ message: 'Relación ingrediente-plan no encontrada' });
      }

      await ingredientePlan.destroy();
      return res.status(200).json({
        message: 'Relación ingrediente-plan eliminada correctamente'
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Error al eliminar la relación',
        error: error.message
      });
    }
  }
}

module.exports = IngredientesPersonalizadosPlanController;
