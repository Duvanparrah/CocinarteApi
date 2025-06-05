const DiaPlanNutricional = require("../models/diaplan.model.js");
const PlanNutricionalSemanal = require("../models/plansemanal.model.js");


class DiaPlanController {
  // Crear un nuevo día
  static async create(req, res) {
    try {
      const { id_semana, nombre_dia } = req.body;

      const semana = await PlanNutricionalSemanal.findByPk(id_semana);
      if (!semana) {
        return res.status(404).json({ message: "Semana no encontrada" });
      }

      const nuevoDia = await DiaPlanNutricional.create({ id_semana, nombre_dia });

      return res.status(201).json({
        message: "Día del plan creado con éxito",
        data: nuevoDia
      });
    } catch (error) {
      console.error("Error en create:", error);
      return res.status(500).json({ message: "Error al crear el día del plan", error: error.message });
    }
  }

  // Obtener todos los días
  static async getAll(req, res) {
    try {
      const dias = await DiaPlanNutricional.findAll({ include: PlanNutricionalSemanal });
      return res.status(200).json({ data: dias });
    } catch (error) {
      console.error("Error en getAll:", error);
      return res.status(500).json({ message: "Error al obtener los días", error: error.message });
    }
  }

  // Obtener día por ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const dia = await DiaPlanNutricional.findByPk(id, { include: PlanNutricionalSemanal });

      if (!dia) {
        return res.status(404).json({ message: "Día del plan no encontrado" });
      }

      return res.status(200).json({ data: dia });
    } catch (error) {
      console.error("Error en getById:", error);
      return res.status(500).json({ message: "Error al obtener el día del plan", error: error.message });
    }
  }

  // Actualizar un día por ID
  static async update(req, res) {
    try {
      const { id } = req.params;
      const dia = await DiaPlanNutricional.findByPk(id);

      if (!dia) {
        return res.status(404).json({ message: "Día del plan no encontrado" });
      }

      await dia.update(req.body);

      return res.status(200).json({
        message: "Día del plan actualizado con éxito",
        data: dia
      });
    } catch (error) {
      console.error("Error en update:", error);
      return res.status(500).json({ message: "Error al actualizar el día del plan", error: error.message });
    }
  }

  // Eliminar un día por ID
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const dia = await DiaPlanNutricional.findByPk(id);

      if (!dia) {
        return res.status(404).json({ message: "Día del plan no encontrado" });
      }

      await dia.destroy();

      return res.status(200).json({ message: "Día del plan eliminado con éxito" });
    } catch (error) {
      console.error("Error en delete:", error);
      return res.status(500).json({ message: "Error al eliminar el día del plan", error: error.message });
    }
  }
}

module.exports = DiaPlanController;
