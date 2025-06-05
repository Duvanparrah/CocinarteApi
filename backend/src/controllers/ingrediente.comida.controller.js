const IngredientePorComida = require('../models/ingredientecomida.model.js');
const ComidaDia = require('../models/comidadia.model.js');

class IngredientePorComidaController {
  // ✅ Crear un nuevo ingrediente por comida
  static async create(req, res) {
    try {
      console.log("Datos recibidos en la solicitud:", req.body); // 🔍 Depuración

      const { id_comida, nombre_ingrediente, cantidad, preparacion } = req.body;

      // ✅ Verificar que id_comida es un número válido
      if (!id_comida || isNaN(id_comida)) {
        return res.status(400).json({ message: "ID de comida inválido." });
      }

      // ✅ Verificar que la comida existe antes de insertar el ingrediente
      const comida = await ComidaDia.findByPk(id_comida);
      if (!comida) {
        return res.status(404).json({ message: "La comida especificada no existe en la base de datos." });
      }

      // ✅ Crear el ingrediente
      const ingrediente = await IngredientePorComida.create({
        id_comida, nombre_ingrediente, cantidad, preparacion
      });

      return res.status(201).json({ message: "Ingrediente creado exitosamente", data: ingrediente });

    } catch (error) {
      console.error("Error en create:", error);
      return res.status(500).json({ message: "Error al crear el ingrediente", error: error.message });
    }
  }

  // ✅ Obtener todos los ingredientes por comida
  static async getAll(req, res) {
    try {
      const ingredientes = await IngredientePorComida.findAll();
      return res.status(200).json({ data: ingredientes });
    } catch (error) {
      console.error("Error en getAll:", error);
      return res.status(500).json({ message: "Error al obtener los ingredientes", error: error.message });
    }
  }

  // ✅ Obtener un ingrediente por ID
  static async getById(req, res) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido." });
      }

      const ingrediente = await IngredientePorComida.findByPk(id);
      if (!ingrediente) {
        return res.status(404).json({ message: "Ingrediente no encontrado." });
      }

      return res.status(200).json({ data: ingrediente });
    } catch (error) {
      console.error("Error en getById:", error);
      return res.status(500).json({ message: "Error al obtener el ingrediente", error: error.message });
    }
  }

  // ✅ Actualizar un ingrediente por ID
  static async update(req, res) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido." });
      }

      const ingrediente = await IngredientePorComida.findByPk(id);
      if (!ingrediente) {
        return res.status(404).json({ message: "Ingrediente no encontrado." });
      }

      await ingrediente.update(req.body);

      return res.status(200).json({ message: "Ingrediente actualizado correctamente", data: ingrediente });

    } catch (error) {
      console.error("Error en update:", error);
      return res.status(500).json({ message: "Error al actualizar el ingrediente", error: error.message });
    }
  }

  // ✅ Eliminar un ingrediente por ID
  static async delete(req, res) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido." });
      }

      const ingrediente = await IngredientePorComida.findByPk(id);
      if (!ingrediente) {
        return res.status(404).json({ message: "Ingrediente no encontrado." });
      }

      await ingrediente.destroy();

      return res.status(200).json({ message: "Ingrediente eliminado correctamente." });

    } catch (error) {
      console.error("Error en delete:", error);
      return res.status(500).json({ message: "Error al eliminar el ingrediente", error: error.message });
    }
  }
}

module.exports = IngredientePorComidaController;
