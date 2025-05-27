const Receta = require('../models/recetas.models');

const crearReceta = async (data) => {
  return await Receta.create(data);
};

const obtenerRecetas = async () => {
  return await Receta.findAll({ include: ['Usuario'] });
};

const obtenerRecetaPorId = async (id) => {
  return await Receta.findByPk(id, { include: ['Usuario'] });
};

const actualizarReceta = async (id, data) => {
  const receta = await Receta.findByPk(id);
  if (!receta) return null;
  await receta.update(data);
  return receta;
};

const eliminarReceta = async (id) => {
  const receta = await Receta.findByPk(id);
  if (!receta) return null;
  await receta.destroy();
  return receta;
};

module.exports = {
  crearReceta,
  obtenerRecetas,
  obtenerRecetaPorId,
  actualizarReceta,
  eliminarReceta,
};
