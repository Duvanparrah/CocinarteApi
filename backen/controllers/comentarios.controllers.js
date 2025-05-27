const comentariosService = require("../services/comentariosServicios");


class ComentariosController {
  async obtenerComentariosPorReceta(req, res) {
  try {
    const { receta_id } = req.params;
    const comentarios = await comentariosService.obtenerComentariosPorReceta(receta_id);
    res.json(comentarios);
  } catch (error) {
    console.error("❌ Error al obtener comentarios:", error);
    res.status(500).json({ error: "Error interno en el servidor" });
  }
}


async crearComentario(req, res) {
  try {
    const { receta_id, usuario_id, contenido } = req.body;

    if (!receta_id || !usuario_id || !contenido) {
      return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    const nuevoComentario = await comentariosService.crearComentario({
      receta_id,
      usuario_id,
      contenido,
    });

    res.status(201).json(nuevoComentario);
  } catch (error) {
    console.error("❌ Error al crear comentario:", error);
    res.status(400).json({ message: error.message || "Error al crear comentario." });
  }
}


  async editarComentario(req, res) {
  try {
    const { receta_id, id } = req.params;
    const data = req.body;

    if (!data.contenido) {
      return res.status(400).json({ error: "El contenido es obligatorio para actualizar" });
    }

    // Validar que el comentario existe en la receta antes de editar
    const comentario = await comentariosService.obtenerComentarioPorId(receta_id, id);
    if (!comentario) {
      return res.status(404).json({ error: "Comentario no encontrado en esta receta." });
    }

    const comentarioEditado = await comentariosService.editarComentario(receta_id, id, data);
    res.json(comentarioEditado);

  } catch (error) {
    console.error("❌ Error al editar comentario:", error);
    res.status(500).json({ error: "Error interno en el servidor" });
  }
}


async eliminarComentario(req, res) {
  try {
    const { receta_id, id } = req.params;

    // Validar que el comentario existe y pertenece a la receta
    const comentario = await comentariosService.obtenerComentarioPorId(receta_id, id);
    if (!comentario) {
      return res.status(404).json({ error: "Comentario no encontrado en esta receta." });
    }

    // Si existe, procedemos a eliminar
    const eliminado = await comentariosService.eliminarComentario(receta_id, id);
    if (!eliminado) {
      return res.status(500).json({ error: "No se pudo eliminar el comentario." });
    }

    res.json({ mensaje: "Comentario eliminado correctamente." });

  } catch (error) {
    console.error("❌ Error al eliminar comentario:", error);
    res.status(500).json({ error: "Error interno en el servidor" });
  }
}


}

module.exports = new ComentariosController();
