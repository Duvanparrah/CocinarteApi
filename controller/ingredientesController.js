const { Op } = require("sequelize");  // Agregar esta línea
const Ingrediente = require("../model/ingredientesModels");
const db = require('../config/db');

// Buscar por nombre (parcial)
const buscarPorNombre = async (req, res) => {
  const { nombre } = req.query;

  try {
    const ingredientes = await Ingrediente.findAll({
      where: {
        nombre_ingrediente: {
          [Op.like]: `%${nombre}%`  // Aquí usamos Op.like para hacer la búsqueda parcial
        }
      }
    });

    res.json(ingredientes);
  } catch (error) {
    console.error("Error al buscar por nombre:", error);
    res.status(500).json({ mensaje: "Error al buscar ingredientes por nombre" });
  }
};

// Buscar por categoría exacta
const buscarPorCategoria = async (req, res) => {
  const { categoria } = req.query;

  try {
    const ingredientes = await Ingrediente.findAll({
      where: {
        categoria: categoria
      }
    });

    res.json(ingredientes);
  } catch (error) {
    console.error("Error al buscar por categoría:", error);
    res.status(500).json({ mensaje: "Error al buscar ingredientes por categoría" });
  }
};

module.exports = {
  buscarPorNombre,
  buscarPorCategoria
};
