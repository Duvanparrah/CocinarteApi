const categoriaService = require("../services/categoriasservice");
const categoriaSchema = require("../schemas/categorias.schemas");

class CategoriasController {
  async obtenerCategorias(req, res) {
    try {
      const categorias = await categoriaService.obtenerCategorias();
      res.json(categorias);
    } catch (error) {
      console.error("❌ Error al obtener categorías:", error);
      res.status(500).json({ error: "Error interno en el servidor" });
    }
  }

  async obtenerCategoriaPorId(req, res) {
    try {
      const { id_categoria } = req.params;
      const categoria = await categoriaService.obtenerCategoriaPorId(id_categoria);
      if (!categoria) {
        return res.status(404).json({ error: "Categoría no encontrada" });
      }
      res.json(categoria);
    } catch (error) {
      console.error("❌ Error al obtener categoría:", error);
      res.status(500).json({ error: "Error interno en el servidor" });
    }
  }

  async crearCategoria(req, res) {
    try {
      const result = categoriaSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ errors: result.error.errors });
      }
      const nueva = await categoriaService.crearCategoria(result.data);
      res.status(201).json(nueva);
    } catch (error) {
      console.error("❌ Error al crear categoría:", error);
      res.status(500).json({ error: "Error interno en el servidor" });
    }
  }

  async editarCategoria(req, res) {
    try {
      const { id_categoria } = req.params;
      const result = categoriaSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ errors: result.error.errors });
      }

      const actualizada = await categoriaService.actualizarCategoria(id_categoria, result.data);
      if (!actualizada) {
        return res.status(404).json({ error: "Categoría no encontrada" });
      }

      res.json(actualizada);
    } catch (error) {
      console.error("❌ Error al editar categoría:", error);
      res.status(500).json({ error: "Error interno en el servidor" });
    }
  }

  async eliminarCategoria(req, res) {
    try {
      const { id_categoria } = req.params;
      const eliminada = await categoriaService.eliminarCategoria(id_categoria);
      if (!eliminada) {
        return res.status(404).json({ error: "Categoría no encontrada" });
      }
      res.json({ mensaje: "Categoría eliminada correctamente" });
    } catch (error) {
      console.error("❌ Error al eliminar categoría:", error);
      res.status(500).json({ error: "Error interno en el servidor" });
    }
  }
}

module.exports = new CategoriasController();
