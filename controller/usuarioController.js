const Usuario = require('../models/usuario');
const { enviarCorreoSuspension } = require('../utils/emailSender');

class UsuarioController {
  // Suspender usuario
  async suspenderUsuario(req, res) {
    try {
      const { id } = req.params; // este id es en realidad id_usuario
      const { motivo } = req.body;

      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }

      usuario.estado = 'suspendido'; // Estado cambiado a "suspendido"
      await usuario.save();

      if (usuario.correo) { // Cambiado de "email" a "correo"
        await enviarCorreoSuspension(usuario.correo, motivo); // Se envía al correo actualizado
      }

      res.status(200).json({ mensaje: 'Usuario suspendido y notificado por correo' });
    } catch (error) {
      console.error('Error al suspender usuario:', error);
      res.status(500).json({ mensaje: 'Error al suspender el usuario', error: error.message });
    }
  }

  // Agregar usuario (solo admin)
  async agregarUsuario(req, res) {
    try {
      if (!req.usuario || req.usuario.rol !== 'administrador') {
        return res.status(403).json({ mensaje: 'Acceso denegado. Solo los administradores pueden agregar usuarios.' });
      }

      const nuevo = await Usuario.create(req.body);
      res.status(201).json({ mensaje: 'Usuario creado', usuario: nuevo });
    } catch (error) {
      console.error('Error al crear usuario:', error);
      res.status(500).json({ mensaje: 'Error al crear usuario', error: error.message });
    }
  }

  // Editar usuario
  async editarUsuario(req, res) {
    const { id } = req.params;
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

      await usuario.update(req.body);
      res.json({ mensaje: 'Usuario actualizado', usuario });
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      res.status(500).json({ mensaje: 'Error al actualizar usuario', error: error.message });
    }
  }

  // Eliminar usuario
  async eliminarUsuario(req, res) {
    const { id } = req.params;
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

      await usuario.destroy();
      res.json({ mensaje: 'Usuario eliminado' });
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      res.status(500).json({ mensaje: 'Error al eliminar usuario', error: error.message });
    }
  }

  // Obtener todos los usuarios
  async listarUsuarios(req, res) {
    try {
      const usuarios = await Usuario.findAll();
      res.json(usuarios);
    } catch (error) {
      console.error('Error al listar usuarios:', error);
      res.status(500).json({ mensaje: 'Error al obtener usuarios', error: error.message });
    }
  }
}

module.exports = new UsuarioController();

