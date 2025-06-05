const Like = require("../models/likes.models");
const UsuarioService = require("../services/usuaroservice");
const RecetaService = require("../services/recetaservice");

const darLike = async (usuario_id, receta_id) => {
  try {
    // ✅ Validar que el usuario existe
    const usuario = await UsuarioService.obtenerUsuarioPorId(usuario_id);
    if (!usuario) throw new Error("El usuario no existe.");

    // ✅ Validar que la receta existe
    const receta = await RecetaService.obtenerRecetaPorId(receta_id);
    if (!receta) throw new Error("La receta no existe.");

    // ✅ Verificar si ya dio like antes
    const yaExiste = await Like.findOne({ where: { usuario_id, receta_id } });
    if (yaExiste) return { yaExiste: true };

    const nuevoLike = await Like.create({ usuario_id, receta_id });
    return { like: nuevoLike };
  } catch (error) {
    console.error("❌ Error al dar like:", error);
    throw error;
  }
};


const quitarLike = async (usuario_id, receta_id) => {
  const eliminado = await Like.destroy({ where: { usuario_id, receta_id } });
  return eliminado > 0;
};

const contarLikes = async (receta_id) => {
  const cantidad = await Like.count({ where: { receta_id } });
  return cantidad;
};

const verificarLike = async (usuario_id, receta_id) => {
  const like = await Like.findOne({ where: { usuario_id, receta_id } });
  return !!like;
};

module.exports = {
  darLike,
  quitarLike,
  contarLikes,
  verificarLike,
};
