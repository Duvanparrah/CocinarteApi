const Usuario = require('./auth.controller');
const TipoPlan = require('./tipoPlan.controller');


class SuscripcionesController {

  // Obtener todas las suscripciones
  async obtenerTodas(req, res) {
    try {
      const suscripciones = await Suscripcion.findAll({
        include: [
          { model: Usuario, attributes: ['id_usuario', 'nombre', 'email'] },
          { model: TipoPlan, attributes: ['id_tipo_plan', 'nombre_plan', 'precio'] }
        ]
      });
      res.json(suscripciones);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener suscripciones' });
    }
  }

  // Obtener suscripciones por ID de usuario
  async obtenerPorUsuario(req, res) {
    const { id_usuario } = req.params;
    try {
      const suscripciones = await Suscripcion.findAll({
        where: { id_usuario },
        include: [
          { model: TipoPlan, attributes: ['nombre_plan', 'precio'] }
        ]
      });
      res.json(suscripciones);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener suscripciones del usuario' });
    }
  }

  // Crear una nueva suscripción (admin o testing)
  async crear(req, res) {
    const { id_usuario, id_tipo_plan, fecha_inicio, fecha_fin } = req.body;
    try {
      const nueva = await Suscripcion.create({
        id_usuario,
        id_tipo_plan,
        fecha_inicio,
        fecha_fin,
        estado: 'activa'
      });
      res.status(201).json(nueva);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la suscripción' });
    }
  }

  // Comprar plan como usuario normal
  async comprarPlan(req, res) {
    const id_usuario = req.usuario.id; // viene del token JWT
    const { id_tipo_plan } = req.body;

    try {
      // Validar si ya tiene una suscripción activa
      const suscripcionActiva = await Suscripcion.findOne({
        where: { id_usuario, estado: "activa" }
      });

      if (suscripcionActiva) {
        return res.status(400).json({ error: "Ya tienes una suscripción activa" });
      }

      // Calcular fechas
      const fecha_inicio = new Date();
      const fecha_fin = new Date();
      fecha_fin.setDate(fecha_inicio.getDate() + 30); // duración de 30 días

      // Crear la nueva suscripción
      const nuevaSuscripcion = await Suscripcion.create({
        id_usuario,
        id_tipo_plan,
        fecha_inicio,
        fecha_fin,
        estado: "activa"
      });

      res.status(201).json({
        mensaje: "Suscripción creada exitosamente",
        data: nuevaSuscripcion
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al procesar la compra del plan" });
    }
  }

  // Actualizar una suscripción
  async actualizar(req, res) {
    const { id } = req.params;
    const { id_tipo_plan, fecha_fin, estado } = req.body;
    try {
      const suscripcion = await Suscripcion.findByPk(id);
      if (!suscripcion) return res.status(404).json({ error: 'Suscripción no encontrada' });

      suscripcion.id_tipo_plan = id_tipo_plan || suscripcion.id_tipo_plan;
      suscripcion.fecha_fin = fecha_fin || suscripcion.fecha_fin;
      suscripcion.estado = estado || suscripcion.estado;

      await suscripcion.save();
      res.json(suscripcion);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la suscripción' });
    }
  }

  // Eliminar una suscripción
  async eliminar(req, res) {
    const { id } = req.params;
    try {
      const suscripcion = await Suscripcion.findByPk(id);
      if (!suscripcion) return res.status(404).json({ error: 'Suscripción no encontrada' });

      await suscripcion.destroy();
      res.json({ mensaje: 'Suscripción eliminada' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la suscripción' });
    }
  }
}

module.exports = new SuscripcionesController();
