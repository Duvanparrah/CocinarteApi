const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { TOKEN_SECRET } = require("../config.js");
const Usuario = require("../models/user.model.js");

class AuthController {
  // 🔹 Registro de usuario
  static async register(req, res) {
    try {
      const { nombre_usuario, email, contraseña, tipo_usuario } = req.body;

      const userExists = await Usuario.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ message: "El correo ya está en uso" });
      }

      const hashedPassword = await bcrypt.hash(contraseña, 12);

      const newUser = await Usuario.create({
        nombre_usuario,
        email,
        contraseña: hashedPassword,
        tipo_usuario: tipo_usuario || "usuario",
      });

      const token = jwt.sign(
        { id: newUser.id_usuario, rol: newUser.tipo_usuario },
        TOKEN_SECRET,
        { expiresIn: "24h" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      return res.status(201).json({
        id: newUser.id_usuario,
        nombre_usuario: newUser.nombre_usuario,
        email: newUser.email,
        tipo_usuario: newUser.tipo_usuario,
        token,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // 🔹 Login general de usuario
  static async login(req, res) {
    try {
      const { email, contraseña } = req.body;

      const user = await Usuario.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: "El correo no existe" });
      }

      const isMatch = await bcrypt.compare(contraseña, user.contraseña);
      if (!isMatch) {
        return res.status(400).json({ message: "La contraseña es incorrecta" });
      }

      const token = jwt.sign(
        { id: user.id_usuario, rol: user.tipo_usuario },
        TOKEN_SECRET,
        { expiresIn: "24h" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      return res.json({ message: "Login exitoso", token });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // 🔹 Login solo para administradores o líderes
  static async loginAdminLider(req, res) {
    try {
      const { email, contraseña } = req.body;

      const user = await Usuario.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: "El correo no existe" });
      }

      if (!["administrador", "admin_lider"].includes(user.tipo_usuario)) {
        return res.status(403).json({ message: "No tienes permisos de administrador o líder" });
      }

      const isMatch = await bcrypt.compare(contraseña, user.contraseña);
      if (!isMatch) {
        return res.status(400).json({ message: "La contraseña es incorrecta" });
      }

      const token = jwt.sign(
        { id: user.id_usuario, rol: user.tipo_usuario },
        TOKEN_SECRET,
        { expiresIn: "24h" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      return res.json({ message: "Login exitoso (Administrador o Líder)", token });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // 🔹 Verificar token y devolver usuario autenticado
  static async verifyToken(req, res) {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token proporcionado" });
    }

    try {
      const decoded = jwt.verify(token, TOKEN_SECRET);
      const user = await Usuario.findByPk(decoded.id);

      if (!user) {
        return res.status(401).json({ message: "Usuario no encontrado" });
      }

      return res.json({
        id: user.id_usuario,
        nombre_usuario: user.nombre_usuario,
        email: user.email,
        tipo_usuario: user.tipo_usuario,
      });
    } catch (error) {
      return res.status(401).json({ message: "Token inválido" });
    }
  }

  // 🔹 Cerrar sesión
  static async logout(req, res) {
    try {
      res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(0),
      });
      return res.status(200).json({ message: "Sesión cerrada correctamente" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // 🔹 Eliminar cuenta del usuario autenticado
  static async deleteAccount(req, res) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "Usuario no autenticado" });
      }

      const deleted = await Usuario.destroy({ where: { id_usuario: userId } });
      if (!deleted) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(0),
      });

      return res.status(200).json({ message: "Cuenta eliminada correctamente" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = AuthController;
