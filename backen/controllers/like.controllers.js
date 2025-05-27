const likesService = require("../services/likeservice");

class LikesController {
 async darLike(req, res) {
  try {
    const { receta_id } = req.params;
    const usuario_id = req.usuario.id; // Viene del token JWT

    const resultado = await likesService.darLike(usuario_id, receta_id);

    if (resultado.yaExiste) {
      return res.status(400).json({ error: "Ya has dado like a esta receta." });
    }

    res.status(201).json({ mensaje: "Like agregado correctamente", like: resultado.like });
  } catch (error) {
    res.status(400).json({ error: error.message || "Error al dar like." });
  }
}


  async quitarLike(req, res) {
    try {
      const { receta_id } = req.params;
      const usuario_id = req.usuario.id;

      const eliminado = await likesService.quitarLike(usuario_id, receta_id);
      if (!eliminado) return res.status(404).json({ error: "No habías dado like a esta receta." });

      res.json({ mensaje: "Like eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al quitar el like" });
    }
  }

  async contarLikes(req, res) {
    try {
      const { receta_id } = req.params;
      const total = await likesService.contarLikes(receta_id);
      res.json({ receta_id, total_likes: total });
    } catch (error) {
      res.status(500).json({ error: "Error al contar likes" });
    }
  }

  async verificarLike(req, res) {
    try {
      const { receta_id } = req.params;
      const usuario_id = req.usuario.id;
      const dadoLike = await likesService.verificarLike(usuario_id, receta_id);
      res.json({ receta_id, usuario_id, like: dadoLike });
    } catch (error) {
      res.status(500).json({ error: "Error al verificar like" });
    }
  }
}

module.exports = new LikesController();
