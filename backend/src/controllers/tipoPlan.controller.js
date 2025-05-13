const TipoPlan = require("../models/tipoPlan.model");

class TipoPlanController {
  // 🔹 Crear un tipo de plan
  static async crearTipoPlan(req, res) {
    try {
      const nuevoPlan = await TipoPlan.create(req.body);
      res.status(201).json(nuevoPlan);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al crear el tipo de plan", error });
    }
  }

  // 🔹 Obtener todos los tipos de plan
  static async obtenerTiposPlanes(req, res) {
    try {
      const planes = await TipoPlan.findAll();
      res.status(200).json(planes);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener los tipos de plan", error });
    }
  }

  // 🔹 Actualizar un tipo de plan
  static async actualizarTipoPlan(req, res) {
    try {
      const { id } = req.params;
      const [actualizado] = await TipoPlan.update(req.body, { where: { id_tipo_plan: id } });

      if (actualizado === 0) {
        return res.status(404).json({ mensaje: "Tipo de plan no encontrado" });
      }

      res.status(200).json({ mensaje: "Tipo de plan actualizado correctamente" });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al actualizar el tipo de plan", error });
    }
  }

  // 🔹 Eliminar un tipo de plan
  static async eliminarTipoPlan(req, res) {
    try {
      const { id } = req.params;
      const eliminado = await TipoPlan.destroy({ where: { id_tipo_plan: id } });

      if (eliminado === 0) {
        return res.status(404).json({ mensaje: "Tipo de plan no encontrado" });
      }

      res.status(200).json({ mensaje: "Tipo de plan eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al eliminar el tipo de plan", error });
    }
  }
}

module.exports = TipoPlanController;
