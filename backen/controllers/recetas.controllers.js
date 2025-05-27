const recetaService = require("../services/recetaservice");
const recetaSchema = require("../schemas/receta.schemas");

class RecetasController {
  async obtenerRecetas(req, res) {
    try {
      const recetas = await recetaService.obtenerRecetas();
      res.json(recetas);
    } catch (error) {
      console.error("❌ Error al obtener recetas:", error);
      res.status(500).json({ error: "Error interno en el servidor" });
    }
  }

  async obtenerRecetaPorId(req, res) {
    try {
      const { id_receta } = req.params;
      const receta = await recetaService.obtenerRecetaPorId(id_receta);
      if (!receta) {
        return res.status(404).json({ error: "Receta no encontrada" });
      }
      res.json(receta);
    } catch (error) {
      console.error("❌ Error al obtener receta:", error);
      res.status(500).json({ error: "Error interno en el servidor" });
    }
  }

  async crearReceta(req, res) {
    try {
      const result = recetaSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ errors: result.error.errors });
      }

      const nuevaReceta = await recetaService.crearReceta(result.data);
      res.status(201).json(nuevaReceta);
    } catch (error) {
      console.error("❌ Error al crear receta:", error);
      res.status(500).json({ error: "Error interno en el servidor" });
    }
  }

  async editarReceta(req, res) {
    try {
      const { id_receta } = req.params;

      const result = recetaSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ errors: result.error.errors });
      }

      const recetaActualizada = await recetaService.actualizarReceta(id_receta, {
        ...result.data,
        fecha_edicion: new Date(),
        editado: true,
      });

      if (!recetaActualizada) {
        return res.status(404).json({ error: "Receta no encontrada" });
      }

      res.json(recetaActualizada);
    } catch (error) {
      console.error("❌ Error al editar receta:", error);
      res.status(500).json({ error: "Error interno en el servidor" });
    }
  }

  async eliminarReceta(req, res) {
    try {
      const { id_receta } = req.params;
      const recetaEliminada = await recetaService.eliminarReceta(id_receta);

      if (!recetaEliminada) {
        return res.status(404).json({ error: "Receta no encontrada" });
      }

      res.json({ mensaje: "Receta eliminada correctamente" });
    } catch (error) {
      console.error("❌ Error al eliminar receta:", error);
      res.status(500).json({ error: "Error interno en el servidor" });
    }
  }
}

module.exports = new RecetasController();
