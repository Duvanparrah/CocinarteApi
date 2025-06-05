const Favorito = require("../models/favoritos.models");

// 🔹 Obtener todos los favoritos
exports.obtenerFavoritos = async (req, res) => {
    try {
        const favoritos = await Favorito.findAll();
        res.json(favoritos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener favoritos", detalle: error.message });
    }
};

// 🔹 Agregar receta a favoritos
exports.agregarFavorito = async (req, res) => {
    try {
        const { usuario_id, receta_id } = req.body;
        const existeFavorito = await Favorito.findOne({ where: { usuario_id, receta_id } });

        if (existeFavorito) {
            return res.status(400).json({ error: "La receta ya está en favoritos." });
        }

        const favorito = await Favorito.create({ usuario_id, receta_id });
        res.status(201).json(favorito);
    } catch (error) {
        res.status(500).json({ error: "Error al agregar favorito", detalle: error.message });
    }
};

// 🔹 Eliminar un favorito
exports.eliminarFavorito = async (req, res) => {
    try {
        const { id } = req.params;
        await Favorito.destroy({ where: { id } });
        res.json({ mensaje: "Favorito eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el favorito", detalle: error.message });
    }
};
