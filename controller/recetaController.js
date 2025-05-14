// controllers/recetaController.js
const Receta = require('../models/receta');
const Ingrediente = require('../models/ingredientes'); // Modelo de ingrediente

class RecetaController {
  // Crear una nueva receta
  static async crearReceta(req, res) {
    try {
      const {
        nombre,
        categoria,
        ingredientes,  // IDs de ingredientes
        preparacion,   // Array de pasos con título y descripción
        tiempo,
        dificultad,
        nutricional = {} // Asegura que siempre haya un objeto
      } = req.body;

      const {
        calorias,
        proteina,
        carbohidratos,
        grasas,
        azucar
      } = nutricional;

      const foto = req.file ? req.file.filename : null; // Si usas multer para la carga de archivos

      // Crear la receta
      const nuevaReceta = await Receta.create({
        nombre,
        categoria,
        preparacion,
        tiempo,
        dificultad,
        foto,
        calorias,
        proteina,
        carbohidratos,
        grasas,
        azucar
      });

      // Asociar los ingredientes con la receta si se proporcionan
      if (ingredientes && ingredientes.length > 0) {
        const ingredientesObjs = await Ingrediente.findAll({
          where: { id: ingredientes }
        });
        await nuevaReceta.setIngredientes(ingredientesObjs);  // Asociar ingredientes con la receta
      }

      res.status(201).json({ mensaje: 'Receta creada con éxito', receta: nuevaReceta });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al crear la receta', error });
    }
  }

  // Obtener todas las recetas
  static async obtenerRecetas(req, res) {
    try {
      const recetas = await Receta.findAll({
        include: {
          model: Ingrediente,
          through: { attributes: [] }
        }
      });
      res.json(recetas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener las recetas', error });
    }
  }

  // Subir imagen (si fuera necesario)
  static async subirImagen(req, res) {
    try {
      res.status(200).json({ mensaje: 'Imagen subida con éxito', archivo: req.file });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al subir la imagen', error });
    }
  }
}

module.exports = RecetaController;

