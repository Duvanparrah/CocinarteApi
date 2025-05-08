const Reacciones = require("../model/reaccionesModel");
const db = require('../config/db');
class ReaccionesController {
    // Función para dar like
    static async darLike(req, res) {
        try {
            const { reaccionId, userId } = req.body;

            // Buscamos la reacción con el ID proporcionado
            const reaccion = await Reacciones.findByPk(reaccionId);
            if (!reaccion) {
                return res.status(404).json({ error: "Reacción no encontrada" });
            }

            // Verificamos si el usuario ya dio like
            if (reaccion.likes.includes(userId)) {
                return res.status(400).json({ error: "Ya diste like a esta reacción" });
            }

            // Agregamos el like y actualizamos la reacción
            reaccion.likes.push(userId);
            await reaccion.save();

            res.json({ mensaje: "Like agregado con éxito", reaccion });
        } catch (error) {
            console.error("Error al dar like:", error);
            res.status(500).json({ error: "Error al dar like" });
        }
    }

    // Función para comentar
    static async comentar(req, res) {
        try {
            const { reaccionId, userId, comentario } = req.body;

            // Buscamos la reacción con el ID proporcionado
            const reaccion = await Reacciones.findByPk(reaccionId);
            if (!reaccion) {
                return res.status(404).json({ error: "Reacción no encontrada" });
            }

            // Agregamos el comentario a la reacción
            reaccion.comentarios.push({ usuario: userId, comentario });
            await reaccion.save();

            res.json({ mensaje: "Comentario agregado con éxito", reaccion });
        } catch (error) {
            console.error("Error al comentar:", error);
            res.status(500).json({ error: "Error al comentar" });
        }
    }

    // Función para compartir
    static async compartir(req, res) {
        try {
            const { reaccionId, userId } = req.body;

            // Buscamos la reacción con el ID proporcionado
            const reaccion = await Reacciones.findByPk(reaccionId);
            if (!reaccion) {
                return res.status(404).json({ error: "Reacción no encontrada" });
            }

            // Verificamos si el usuario ya compartió la reacción
            if (reaccion.compartidos.includes(userId)) {
                return res.status(400).json({ error: "Ya compartiste esta reacción" });
            }

            // Agregamos el compartido y actualizamos la reacción
            reaccion.compartidos.push(userId);
            await reaccion.save();

            res.json({ mensaje: "Reacción compartida con éxito", reaccion });
        } catch (error) {
            console.error("Error al compartir:", error);
            res.status(500).json({ error: "Error al compartir" });
        }
    }
}

module.exports = ReaccionesController;
