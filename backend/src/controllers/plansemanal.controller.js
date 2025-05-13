const PlanNutricionalSemanal = require("../models/plansemanal.model.js");
const PlanNutricional = require("../models/plan.model.js");
const { planNutricionalSemanalSchema } = require("../schemas/plansemanal.shema.js");

class PlanNutricionalSemanalController {
  // ✅ Crear una nueva semana de un plan nutricional
  static async create(req, res) {
    try {
      // Validar datos con Zod
      const parsed = planNutricionalSemanalSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Datos inválidos", errors: parsed.error.format() });
      }

      const { id_plan } = parsed.data;

      // Validar existencia del plan antes de crear la semana
      const plan = await PlanNutricional.findByPk(id_plan);
      if (!plan) {
        return res.status(404).json({ message: "Plan nutricional no encontrado" });
      }

      // Crear la semana
      const nuevaSemana = await PlanNutricionalSemanal.create(parsed.data);

      return res.status(201).json({ message: "Semana creada con éxito", data: nuevaSemana });

    } catch (error) {
      console.error("Error en create:", error.stack);
      return res.status(500).json({ message: "Error interno al crear la semana" });
    }
  }

  // ✅ Obtener todas las semanas con relación al PlanNutricional
  static async getAll(req, res) {
    try {
      const semanas = await PlanNutricionalSemanal.findAll({
        include: {
          model: PlanNutricional,
          as: "planNutricional",
          attributes: ["id_plan", "nombre_plan"]
        }
      });

      return res.status(200).json({ data: semanas });

    } catch (error) {
      console.error("Error en getAll:", error.stack);
      return res.status(500).json({ message: "Error al obtener las semanas" });
    }
  }

  // ✅ Obtener una semana por su ID con relación al PlanNutricional
  static async getById(req, res) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

      const semana = await PlanNutricionalSemanal.findByPk(id, {
        include: {
          model: PlanNutricional,
          as: "planNutricional",
          attributes: ["id_plan", "nombre_plan"]
        }
      });

      if (!semana) return res.status(404).json({ message: "Semana no encontrada" });

      return res.status(200).json({ data: semana });

    } catch (error) {
      console.error("Error en getById:", error.stack);
      return res.status(500).json({ message: "Error al obtener la semana" });
    }
  }

  // ✅ Actualizar una semana
  static async update(req, res) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

      const semana = await PlanNutricionalSemanal.findByPk(id);
      if (!semana) return res.status(404).json({ message: "Semana no encontrada" });

      const parsed = planNutricionalSemanalSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Datos inválidos", errors: parsed.error.format() });
      }

      await semana.update(parsed.data);

      return res.status(200).json({ message: "Semana actualizada con éxito", data: semana });

    } catch (error) {
      console.error("Error en update:", error.stack);
      return res.status(500).json({ message: "Error al actualizar la semana" });
    }
  }

  // ✅ Eliminar una semana
  static async delete(req, res) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

      const semana = await PlanNutricionalSemanal.findByPk(id);
      if (!semana) return res.status(404).json({ message: "Semana no encontrada" });

      await semana.destroy();

      return res.status(200).json({ message: "Semana eliminada con éxito" });

    } catch (error) {
      console.error("Error en delete:", error.stack);
      return res.status(500).json({ message: "Error al eliminar la semana" });
    }
  }
}

module.exports = PlanNutricionalSemanalController;
