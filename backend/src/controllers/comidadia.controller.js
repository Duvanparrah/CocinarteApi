const ComidaDia = require("../models/comidadia.model.js");
const DiaPlanNutricional = require("../models/diaplan.model.js");

class ComidaDiaController {
  // ✅ Crear una nueva comida del día
  static async create(req, res) {
    try {
      const { id_dia, tipo_comida, kcal, proteinas, carbohidratos, grasas } = req.body;

      // ✅ Verificar que `id_dia` existe en `DiaPlanNutricional`
      const dia = await DiaPlanNutricional.findByPk(id_dia);
      if (!dia) {
        return res.status(404).json({ message: "Día del plan nutricional no encontrado" });
      }

      // ✅ Crear la comida
      const nuevaComida = await ComidaDia.create({
        id_dia, tipo_comida, kcal, proteinas, carbohidratos, grasas
      });

      return res.status(201).json({ message: "Comida creada con éxito", data: nuevaComida });
    } catch (error) {
      console.error("Error en create:", error);
      return res.status(500).json({ message: "Error al crear la comida", error: error.message });
    }
  }

  // ✅ Obtener todas las comidas
  static async getAll(req, res) {
    try {
      const comidas = await ComidaDia.findAll({
        include: [{ model: DiaPlanNutricional, as: "dia" }] // ✅ Corrección en la inclusión
      });

      return res.status(200).json({ data: comidas });
    } catch (error) {
      console.error("Error en getAll:", error);
      return res.status(500).json({ message: "Error al obtener las comidas", error: error.message });
    }
  }

  // ✅ Obtener una comida por ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const comida = await ComidaDia.findByPk(id, {
        include: [{ model: DiaPlanNutricional, as: "dia" }] // ✅ Corrección en la inclusión
      });

      if (!comida) {
        return res.status(404).json({ message: "Comida no encontrada" });
      }

      return res.status(200).json({ data: comida });
    } catch (error) {
      console.error("Error en getById:", error);
      return res.status(500).json({ message: "Error al obtener la comida", error: error.message });
    }
  }

  // ✅ Actualizar una comida
  static async update(req, res) {
    try {
      const { id } = req.params;
      const comida = await ComidaDia.findByPk(id);

      if (!comida) {
        return res.status(404).json({ message: "Comida no encontrada" });
      }

      await comida.update(req.body);

      return res.status(200).json({ message: "Comida actualizada con éxito", data: comida });
    } catch (error) {
      console.error("Error en update:", error);
      return res.status(500).json({ message: "Error al actualizar la comida", error: error.message });
    }
  }

  // ✅ Eliminar una comida
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const comida = await ComidaDia.findByPk(id);

      if (!comida) {
        return res.status(404).json({ message: "Comida no encontrada" });
      }

      await comida.destroy();

      return res.status(200).json({ message: "Comida eliminada con éxito" });
    } catch (error) {
      console.error("Error en delete:", error);
      return res.status(500).json({ message: "Error al eliminar la comida", error: error.message });
    }
  }
}

module.exports = ComidaDiaController;
