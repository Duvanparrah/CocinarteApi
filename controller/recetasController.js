// controllers/recetasController.js
const Receta = require('../model/recetasModel');
const { Op } = require('sequelize');

class RecetasController {
    // Obtener todas las recetas
    static async obtenerTodas(req, res) {
        try {
            const recetas = await Receta.findAll();
            res.json(recetas);
        } catch (error) {
            console.error("Error al obtener recetas:", error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    }

    // Crear una nueva receta
    static async crearReceta(req, res) {
        try {
            const { titulo, descripcion, tipo_preparacion, dificultad, tiempo_preparacion, imagen, categoria, fuente, azucar_total, calorias, proteinas, carbohidratos, grasas_totales, id_usuario } = req.body;

            if (!titulo || !imagen || !id_usuario) {
                return res.status(400).json({ error: "Título, imagen y usuario son obligatorios" });
            }

            const nuevaReceta = await Receta.create({
                titulo, descripcion, tipo_preparacion, dificultad, tiempo_preparacion, imagen, categoria, fuente, azucar_total, calorias, proteinas, carbohidratos, grasas_totales, id_usuario
            });

            res.status(201).json({ mensaje: "Receta creada exitosamente", receta: nuevaReceta });
        } catch (error) {
            console.error("Error al crear receta:", error);
            res.status(500).json({ error: "Error al guardar la receta" });
        }
    }

    // Buscar recetas por nombre
    static async buscarPorNombre(req, res) {
        try {
            const { q } = req.query;
    
            // Validamos si se pasó un nombre para buscar
            if (!q) {
                return res.status(400).json({ error: "Debes escribir un nombre para buscar" });
            }
    
            // Realizamos la consulta con DISTINCT para evitar duplicados
            const recetas = await Receta.findAll({
                where: {
                    titulo: {
                        [Op.like]: `%${q}%`, // Usamos Op.like para buscar por nombre
                    },
                },
                // Aseguramos que no se repita el titulo
                distinct: true,
                attributes: ['id_receta', 'titulo', 'descripcion', 'tipo_preparacion', 'dificultad', 'tiempo_preparacion', 'imagen', 'categoria', 'fuente', 'azucar_total', 'calorias', 'proteinas', 'carbohidratos', 'grasas_totales', 'fecha_creacion', 'fecha_actualizacion', 'id_usuario']
            });
    
            // Verificamos si no se encontraron recetas
            if (recetas.length === 0) {
                return res.status(404).json({ mensaje: "No se encontraron recetas" });
            }
    
            // Devolvemos las recetas encontradas
            res.json(recetas);
        } catch (error) {
            console.error("Error al buscar receta:", error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    }
    

    }

module.exports = RecetasController;
