const Ingrediente = require('../models/ingredientes'); // Modelo Sequelize
const { Op } = require('sequelize'); // Operador para la búsqueda

class IngredientesController {
  
  // Crear un nuevo ingrediente
  static async crearIngrediente(req, res) {
    try {
      const { nombre_ingrediente, imagen, categoria, calorias_por_100g, proteinas_por_100g, 
              carbohidratos_por_100g, grasas_totales_por_100g, azucar_por_100g, unidad, fibra, sodio } = req.body;

      const nuevoIngrediente = await Ingrediente.create({
        nombre_ingrediente,
        imagen,
        categoria,
        calorias_por_100g,
        proteinas_por_100g,
        carbohidratos_por_100g,
        grasas_totales_por_100g,
        azucar_por_100g,
        unidad,
        fibra,
        sodio
      });
      
      res.status(201).json({ mensaje: 'Ingrediente creado correctamente', ingrediente: nuevoIngrediente });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al crear ingrediente', error });
    }
  }

  // Buscar ingredientes por nombre
  static async buscarIngredientes(req, res) {
    const { nombre_ingrediente } = req.query; // Cambié el nombre para que coincida con el modelo
    try {
      const resultados = await Ingrediente.findAll({
        where: {
          nombre_ingrediente: {
            [Op.like]: `%${nombre_ingrediente}%`
          }
        },
        limit: 10
      });

      res.json(resultados);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error en búsqueda', error });
    }
  }

  // Actualizar un ingrediente por ID
  static async actualizarIngrediente(req, res) {
    const { id_ingrediente } = req.params; // Cambié el nombre para que coincida con el modelo
    try {
      const [updated] = await Ingrediente.update(req.body, {
        where: { id_ingrediente }
      });

      if (!updated) return res.status(404).json({ mensaje: 'Ingrediente no encontrado' });

      const actualizado = await Ingrediente.findByPk(id_ingrediente);
      res.json({ mensaje: 'Ingrediente actualizado correctamente', actualizado });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al actualizar ingrediente', error });
    }
  }

  // Subir imagen del ingrediente
  static async subirImagen(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ mensaje: 'No se ha subido ninguna imagen' });
      }
      // Aquí puedes guardar la URL del archivo en la base de datos si lo deseas.
      res.status(200).json({ mensaje: 'Imagen subida correctamente', archivo: req.file });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al subir la imagen', error });
    }
  }
}

module.exports = IngredientesController;
