const usuarioService = require('../services/usuaroservice');
const TokenRevocado = require("../models/blacckToken");

class UsuarioController {
  async crearUsuario(req, res) {
    try {
      const { usuario, token } = await usuarioService.crearUsuario(req.body);
      console.log(JSON.stringify({ message: "✅ Usuario creado correctamente", usuario }));
      res.status(201).json({
        message: "Usuario creado exitosamente",
        usuario,
        token,
      });
    } catch (error) {
      console.error(JSON.stringify({ error: "❌ Error al crear usuario", detalle: error.message }));
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    const { correo, contrasena } = req.body;

    try {
      const result = await usuarioService.login(correo, contrasena);
      console.log(JSON.stringify({ message: "✅ Login exitoso", usuario: correo }));
      res.status(200).json(result);
    } catch (error) {
      console.error(JSON.stringify({ error: "❌ Fallo en login", correo, detalle: error.message }));
      res.status(401).json({ error: error.message });
    }
  }

  async logout(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        console.warn(JSON.stringify({ warning: "⚠️ Token no proporcionado en logout" }));
        return res.status(400).json({ error: "Token no proporcionado" });
      }

      await TokenRevocado.create({ token });
      console.log(JSON.stringify({ message: "✅ Token revocado. Sesión cerrada correctamente." }));
      res.json({ message: "Sesión cerrada correctamente" });
    } catch (error) {
      console.error(JSON.stringify({ error: "❌ Error al cerrar sesión", detalle: error.message }));
      res.status(500).json({ error: "Error al cerrar sesión" });
    }
  }

  async obtenerUsuarios(req, res) {
    try {
      const usuarios = await usuarioService.obtenerUsuarios();
      console.log(JSON.stringify({ message: "📋 Usuarios obtenidos", total: usuarios.length }));
      res.status(200).json(usuarios);
    } catch (error) {
      console.error(JSON.stringify({ error: "❌ Error al obtener usuarios", detalle: error.message }));
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerUsuarioPorId(req, res) {
    try {
      const usuario = await usuarioService.obtenerUsuarioPorId(req.params.id);
      console.log(JSON.stringify({ message: "🔍 Usuario encontrado", id: req.params.id }));
      res.status(200).json(usuario);
    } catch (error) {
      console.error(JSON.stringify({ error: "❌ Usuario no encontrado", id: req.params.id, detalle: error.message }));
      res.status(404).json({ error: error.message });
    }
  }

  async actualizarUsuario(req, res) {
    try {
      const usuarioActualizado = await usuarioService.actualizarUsuario(req.params.id, req.body);
      console.log(JSON.stringify({ message: "✏️ Usuario actualizado", id: req.params.id }));
      res.status(200).json(usuarioActualizado);
    } catch (error) {
      console.error(JSON.stringify({ error: "❌ Error al actualizar usuario", id: req.params.id, detalle: error.message }));
      res.status(400).json({ error: error.message });
    }
  }

  async eliminarUsuario(req, res) {
    try {
      const response = await usuarioService.eliminarUsuario(req.params.id);
      console.log(JSON.stringify({ message: "🗑️ Usuario eliminado", id: req.params.id }));
      res.status(200).json(response);
    } catch (error) {
      console.error(JSON.stringify({ error: "❌ Error al eliminar usuario", id: req.params.id, detalle: error.message }));
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new UsuarioController();
