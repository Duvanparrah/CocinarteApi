const PlanNutricional = require("../models/planutricional.models");

// 🔹 Obtener todos los planes nutricionales
exports.obtenerPlanes = async (req, res) => {
    try {
        const planes = await PlanNutricional.findAll();
        res.json(planes);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener planes nutricionales", detalle: error.message });
    }
};

// 🔹 Crear un nuevo plan nutricional
exports.crearPlan = async (req, res) => {
    try {
        const nuevoPlan = await PlanNutricional.create(req.body);
        res.status(201).json(nuevoPlan);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el plan nutricional", detalle: error.message });
    }
};

// 🔹 Actualizar un plan nutricional
exports.actualizarPlan = async (req, res) => {
    try {
        const { id } = req.params;
        await PlanNutricional.update(req.body, { where: { id } });
        res.json({ mensaje: "Plan nutricional actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el plan", detalle: error.message });
    }
};

// 🔹 Eliminar un plan nutricional
exports.eliminarPlan = async (req, res) => {
    try {
        const { id } = req.params;
        await PlanNutricional.destroy({ where: { id } });
        res.json({ mensaje: "Plan eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el plan", detalle: error.message });
    }
};
