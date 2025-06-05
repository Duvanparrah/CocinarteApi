const NutritionPlan = require("../models/plan.model.js");
const Usuario = require("../models/user.model.js");

class PlanNutricionalController {
  // Crear un nuevo Plan Nutricional
  static async create(req, res) {
    try {
      const {
        nombre_plan,
        descripcion,
        objetivo,
        calorias,
        proteinas,
        grasas,
        carbohidratos,
        azucar_total,
        comidas_por_dia,
        id_usuario
      } = req.body;

      // Validación de campos obligatorios
      if (!nombre_plan || !objetivo || !calorias || !id_usuario) {
        return res.status(400).json({ message: "Faltan datos obligatorios para crear el plan" });
      }

      // Verificar si el usuario existe
      const usuario = await Usuario.findByPk(id_usuario);
      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Crear el nuevo plan nutricional
      const nuevoPlan = await NutritionPlan.create({
        nombre_plan,
        descripcion: descripcion || "",
        objetivo,
        calorias,
        proteinas: proteinas || 0,
        grasas: grasas || 0,
        carbohidratos: carbohidratos || 0,
        azucar_total: azucar_total || 0,
        comidas_por_dia: comidas_por_dia || 3,
        id_usuario
      });

      return res.status(201).json({
        message: "Plan nutricional creado con éxito",
        data: nuevoPlan
      });

    } catch (error) {
      console.error("Error en create:", error);
      return res.status(500).json({
        message: "Error al crear el plan nutricional",
        error: error.message
      });
    }
  }

  // Obtener todos los planes nutricionales
  static async getAll(req, res) {
    try {
      const planes = await NutritionPlan.findAll({
        include: {
          model: Usuario,
          attributes: ['id', 'nombre', 'correo']
        }
      });
      return res.status(200).json({ data: planes });

    } catch (error) {
      console.error("Error en getAll:", error);
      return res.status(500).json({
        message: "Error al obtener los planes nutricionales",
        error: error.message
      });
    }
  }

  // Obtener un plan nutricional por su ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const plan = await NutritionPlan.findByPk(id, {
        include: {
          model: Usuario,
          attributes: ['id', 'nombre', 'correo']
        }
      });

      if (!plan) {
        return res.status(404).json({ message: "Plan nutricional no encontrado" });
      }

      return res.status(200).json({ data: plan });

    } catch (error) {
      console.error("Error en getById:", error);
      return res.status(500).json({
        message: "Error al obtener el plan nutricional",
        error: error.message
      });
    }
  }

  // Actualizar un plan nutricional
  static async update(req, res) {
    try {
      const { id } = req.params;
      const plan = await NutritionPlan.findByPk(id);

      if (!plan) {
        return res.status(404).json({ message: "Plan nutricional no encontrado" });
      }

      await plan.update(req.body);

      return res.status(200).json({
        message: "Plan nutricional actualizado con éxito",
        data: plan
      });

    } catch (error) {
      console.error("Error en update:", error);
      return res.status(500).json({
        message: "Error al actualizar el plan nutricional",
        error: error.message
      });
    }
  }

  // Eliminar un plan nutricional
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const plan = await NutritionPlan.findByPk(id);

      if (!plan) {
        return res.status(404).json({ message: "Plan nutricional no encontrado" });
      }

      await plan.destroy();

      return res.status(200).json({
        message: "Plan nutricional eliminado con éxito"
      });

    } catch (error) {
      console.error("Error en delete:", error);
      return res.status(500).json({
        message: "Error al eliminar el plan nutricional",
        error: error.message
      });
    }
  }
}

module.exports = PlanNutricionalController;
