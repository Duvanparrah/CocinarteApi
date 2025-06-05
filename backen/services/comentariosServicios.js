const Comentario = require("../models/comentarios.models");
const Receta = require("../services/recetaservice");
const Usuario = require("../services/usuaroservice");


const obtenerComentariosPorReceta = async (receta_id) => {
  try {
    const comentarios = await Comentario.findAll({ where: { receta_id } });
    console.log(`✅ Comentarios para receta ${receta_id} obtenidos`);
    return comentarios;
  } catch (error) {
    console.error("❌ Error en obtenerComentariosPorReceta:", error);
    throw error;
  }
};


const obtenerComentarioPorId = async (receta_id, id) => {
  try {
    const comentario = await Comentario.findOne({ where: { id, receta_id } });
    if (!comentario) {
      console.log(`⚠️ Comentario ${id} no encontrado en receta ${receta_id}`);
      return null;
    }
    console.log(`✅ Comentario ${id} obtenido para receta ${receta_id}`);
    return comentario;
  } catch (error) {
    console.error("❌ Error en obtenerComentarioPorId:", error);
    throw error;
  }
};

const crearComentario = async (data) => {
  try {
    const { receta_id, usuario_id } = data;

    // Validar si existe la receta
    const receta = await Receta.obtenerRecetaPorId(receta_id);
    if (!receta) throw new Error("La receta no existe.");

    // Validar si existe el usuario
    const usuario = await Usuario.obtenerUsuarioPorId(usuario_id);
    if (!usuario) throw new Error("El usuario no existe.");

    const nuevoComentario = await Comentario.create(data);
    console.log(`✅ Comentario creado para receta ${receta_id}`);
    return nuevoComentario;
  } catch (error) {
    console.error("❌ Error en crearComentario:", error);
    throw error;
  }
};


const editarComentario = async (receta_id, id, data) => {
  try {
    // Validar receta
    const receta = await Receta.obtenerRecetaPorId(receta_id);
    if (!receta) throw new Error("La receta no existe.");

    const comentario = await Comentario.findOne({ where: { id, receta_id } });
    if (!comentario) return null;

    await comentario.update({
      ...data,
      fecha_edicion: new Date(),
      editado: true
    });
    return comentario;
  } catch (error) {
    console.error("❌ Error en editarComentario:", error);
    throw error;
  }
};


const eliminarComentario = async (receta_id, id) => {
  try {
    // Validar receta
    const receta = await Receta.obtenerRecetaPorId(receta_id);
    if (!receta) throw new Error("La receta no existe.");

    const eliminado = await Comentario.destroy({ where: { id, receta_id } });
    return eliminado !== 0;
  } catch (error) {
    console.error("❌ Error en eliminarComentario:", error);
    throw error;
  }
};


module.exports = {
  obtenerComentariosPorReceta,
  obtenerComentarioPorId,
  crearComentario,
  editarComentario,
  eliminarComentario,
};
