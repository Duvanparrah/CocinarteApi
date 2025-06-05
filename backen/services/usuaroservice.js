const Usuario = require('../models/auth.models'); // Asegúrate de ajustar la ruta
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "kIHmy2wJ4+B/CSkqTa4ygypIFfpFtZW/I6cv+HBgvD4="; // Usa una variable de entorno en producción


class UsuarioService {
 async crearUsuario(data) {
    try {
      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(data.contrasena, 10);
      data.contrasena = hashedPassword;

      // Crear el usuario
      const nuevoUsuario = await Usuario.create(data);

      // Generar el token JWT
      const token = jwt.sign(
        {
          id_usuario: nuevoUsuario.id_usuario,
          correo: nuevoUsuario.correo,
          tipo_usuario: nuevoUsuario.tipo_usuario,
        },
        SECRET_KEY,
        { expiresIn: "2h" }
      );

      return {
        usuario: nuevoUsuario,
        token,
      };
    } catch (error) {
      throw new Error("Error al crear el usuario: " + error.message);
    }
  }
  async login(correo, contrasena) {
    try {
      const usuario = await Usuario.findOne({ where: { correo } });
      if (!usuario) {
        throw new Error("Correo o contraseña incorrectos");
      }

      const passwordValida = await bcrypt.compare(contrasena, usuario.contrasena);
      if (!passwordValida) {
        throw new Error("Correo o contraseña incorrectos");
      }

      const token = jwt.sign(
        {
          id_usuario: usuario.id_usuario,
          tipo_usuario: usuario.tipo_usuario,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      return {
        message: "Inicio de sesión exitoso",
        token,
        usuario: {
          id_usuario: usuario.id_usuario,
          nombre_usuario: usuario.nombre_usuario,
          correo: usuario.correo,
          tipo_usuario: usuario.tipo_usuario,
          foto_perfil: usuario.foto_perfil,
        },
      };
    } catch (error) {
      throw new Error("Error en el login: " + error.message);
    }
  }

  async registrar(data) {
    try {
      const hash = await bcrypt.hash(data.contrasena, 10);
      data.contrasena = hash;
      const nuevoUsuario = await Usuario.create(data);
      return nuevoUsuario;
    } catch (error) {
      throw new Error("Error al registrar el usuario: " + error.message);
    }
}

  async obtenerUsuarios() {
    try {
      const usuarios = await Usuario.findAll();
      return usuarios;
    } catch (error) {
      throw new Error('Error al obtener los usuarios: ' + error.message);
    }
  }

  async obtenerUsuarioPorId(id) {
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }
      return usuario;
    } catch (error) {
      throw new Error('Error al obtener el usuario: ' + error.message);
    }
  }

  async actualizarUsuario(id, data) {
    try {
      const [actualizado] = await Usuario.update(data, {
        where: { id_usuario: id },
      });
      if (!actualizado) {
        throw new Error('Usuario no encontrado');
      }
      return await this.obtenerUsuarioPorId(id);
    } catch (error) {
      throw new Error('Error al actualizar el usuario: ' + error.message);
    }
  }

  async eliminarUsuario(id) {
    try {
      const eliminado = await Usuario.destroy({
        where: { id_usuario: id },
      });
      if (!eliminado) {
        throw new Error('Usuario no encontrado');
      }
      return { message: 'Usuario eliminado con éxito' };
    } catch (error) {
      throw new Error('Error al eliminar el usuario: ' + error.message);
    }
  }
}

module.exports = new UsuarioService();
