const { Op } = require('sequelize'); // Importa Op correctamente
const Filtro = require('../model/filtroModel');

class FiltroController {
    static async getFiltroByFilter(req, res) {
        try {
            const { q, tipoComida, origen, tiempoPreparacion, dificultad } = req.query;

            let filtroBusqueda = {};

            if (q) {
                filtroBusqueda.nombre = {
                    [Op.like]: `%${q}%`, // MySQL usa LIKE (no iLike)
                };
            }

            if (tipoComida) {
                filtroBusqueda.tipoComida = {
                    [Op.like]: `%${tipoComida}%`,
                };
            }

            if (origen) {
                filtroBusqueda.origen = {
                    [Op.like]: `%${origen}%`,
                };
            }

            if (tiempoPreparacion) {
                filtroBusqueda.tiempoPreparacion = parseInt(tiempoPreparacion);
            }

            if (dificultad) {
                filtroBusqueda.dificultad = {
                    [Op.like]: `%${dificultad}%`,
                };
            }

            const filtros = await Filtro.findAll({
                where: filtroBusqueda,
            });

            if (filtros.length === 0) {
                return res.status(404).json({ error: "No se encontraron filtros con los criterios dados" });
            }

            res.json(filtros);
        } catch (error) {
            console.error("Error al filtrar:", error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = FiltroController;
