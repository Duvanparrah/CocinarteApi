const Notificacion = require("./notificaciones.controllers")

// 🔹 Obtener todas las notificaciones
exports.obtenerNotificaciones = async (req, res) => {
    try {
        const notificaciones = await Notificacion.findAll();
        res.json(notificaciones);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener notificaciones", detalle: error.message });
    }
};

// 🔹 Crear una nueva notificación
exports.crearNotificacion = async (req, res) => {
    try {
        const { usuario_id, tipo, mensaje } = req.body;
        const notificacion = await Notificacion.create({ usuario_id, tipo, mensaje });
        res.status(201).json(notificacion);
    } catch (error) {
        res.status(500).json({ error: "Error al crear notificación", detalle: error.message });
    }
};

// 🔹 Marcar una notificación como leída
exports.marcarLeida = async (req, res) => {
    try {
        const { id } = req.params;
        await Notificacion.update({ leida: true }, { where: { id } });
        res.json({ mensaje: "Notificación marcada como leída" });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar notificación", detalle: error.message });
    }
};

// 🔹 Eliminar una notificación
exports.eliminarNotificacion = async (req, res) => {
    try {
        const { id } = req.params;
        await Notificacion.destroy({ where: { id } });
        res.json({ mensaje: "Notificación eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar notificación", detalle: error.message });
    }
};
