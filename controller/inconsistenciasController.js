const Inconsistencia = require('../models/inconsistencias');

class InconsistenciasController {
  async obtenerInconsistencias(req, res) {
    try {
      const inconsistencias = await Inconsistencia.findAll();
      res.json(inconsistencias);
    } catch (error) {
      console.error('❌ Error al obtener inconsistencias:', error);
      res.status(500).json({ mensaje: 'Error al obtener inconsistencias' });
    }
  }

  async crearInconsistencia(req, res) {
    try {
      const nueva = await Inconsistencia.create(req.body);
      res.status(201).json(nueva);
    } catch (error) {
      console.error('❌ Error al crear inconsistencia:', error);
      res.status(500).json({ mensaje: 'Error al crear inconsistencia' });
    }
  }

  async aprobarInconsistencia(req, res) {
    try {
      const { id } = req.params;
      const inconsistencia = await Inconsistencia.findByPk(id);

      if (!inconsistencia) {
        return res.status(404).json({ mensaje: 'Inconsistencia no encontrada' });
      }

      inconsistencia.estado = 'aprobada';
      await inconsistencia.save();

      res.json(inconsistencia);
    } catch (error) {
      console.error('❌ Error al aprobar inconsistencia:', error);
      res.status(500).json({ mensaje: 'Error al aprobar inconsistencia' });
    }
  }

  async rechazarInconsistencia(req, res) {
    try {
      const { id } = req.params;
      const inconsistencia = await Inconsistencia.findByPk(id);

      if (!inconsistencia) {
        return res.status(404).json({ mensaje: 'Inconsistencia no encontrada' });
      }

      inconsistencia.estado = 'rechazada';
      await inconsistencia.save();

      res.json(inconsistencia);
    } catch (error) {
      console.error('❌ Error al rechazar inconsistencia:', error);
      res.status(500).json({ mensaje: 'Error al rechazar inconsistencia' });
    }
  }
}

module.exports = new InconsistenciasController();

