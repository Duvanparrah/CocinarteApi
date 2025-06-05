// controller/authController.js

const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { User } = require("../model/authModels");
const { generateToken } = require("../utils/jwtUtils");
const { verifyGoogleToken } = require("../utils/googleVerify");
const { Op } = require("sequelize");

class AuthController {
  // Método para registrar usuario
  async register(req, res) {
    try {
      const { email, password, isGoogle, nombre, foto } = req.body;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: "El correo ya está registrado" });
      }

      let hashedPassword = "";
      if (!isGoogle) {
        if (!password) {
          return res.status(400).json({ error: "La contraseña es requerida" });
        }
        hashedPassword = await bcrypt.hash(password, 10);
      }

      const user = await User.create({
        email,
        password: hashedPassword,
        nombre: nombre || "",
        foto: foto || "",
        googleAccount: !!isGoogle,
        idioma: "español",
        favoritos: [],
        notificaciones: [],
      });

      const token = generateToken(user.id);
      res.status(201).json({ message: "Usuario registrado correctamente", token });
    } catch (error) {
      console.error("Error en el registro:", error);
      res.status(500).json({ error: "Error al registrar usuario" });
    }
  }

  // Método para iniciar sesión
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Credenciales incorrectas" });
      }
      const token = generateToken(user.id);
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: "Error al iniciar sesión" });
    }
  }

  // Método para registro con Google
  async registerWithGoogle(req, res) {
    try {
      const { credential: idToken } = req.body;
      const payload = await verifyGoogleToken(idToken);
      const { email, name, picture } = payload;

      let user = await User.findOne({ where: { email } });

      if (!user) {
        user = await User.create({
          email,
          nombre: name,
          foto: picture,
          idioma: "español",
          favoritos: [],
          notificaciones: [],
          googleAccount: true,
        });
      }

      const token = generateToken(user.id);
      res.status(200).json({ token });
    } catch (error) {
      console.error("Error al registrar con Google:", error);
      res.status(500).json({ error: "Error al registrar con Google" });
    }
  }

  // Método para obtener perfil de usuario
  async getProfile(req, res) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ["password"] },
      });

      if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

      if (!user.nombre || user.nombre.trim() === "") {
        const email = user.email;
        const nombreGenerado = email.match(/[a-zA-Z]+/g)?.[1] || "usuario";
        const randomNum = Math.floor(100000 + Math.random() * 900000);
        user.nombre = `${nombreGenerado}${randomNum}`;
        await user.save();
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener perfil" });
    }
  }

  // Método para actualizar perfil de usuario
  async updateProfile(req, res) {
    try {
      const { idioma } = req.body;
      const user = await User.findByPk(req.user.id);
      if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

      user.idioma = idioma;
      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar perfil" });
    }
  }

  // Método para agregar favorito
  async addFavorite(req, res) {
    try {
      const { recetaId } = req.body;
      const user = await User.findByPk(req.user.id);
      user.favoritos = [...new Set([...(user.favoritos || []), recetaId])];
      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Error al agregar favorito" });
    }
  }

  // Método para eliminar favorito
  async removeFavorite(req, res) {
    try {
      const { recetaId } = req.body;
      const user = await User.findByPk(req.user.id);
      user.favoritos = (user.favoritos || []).filter((id) => id !== recetaId);
      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar favorito" });
    }
  }

  // Método para obtener notificaciones
  async getNotifications(req, res) {
    try {
      const user = await User.findByPk(req.user.id);
      if (!user || !(user.notificaciones || []).length) {
        return res.status(404).json({ error: "No hay notificaciones disponibles" });
      }
      res.json(user.notificaciones);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener notificaciones" });
    }
  }

  // Método para agregar notificación
  async addNotification(req, res) {
    try {
      const { mensaje } = req.body;
      const user = await User.findByPk(req.user.id);
      user.notificaciones = [...(user.notificaciones || []), mensaje];
      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Error al agregar notificación" });
    }
  }

  // Método para logout
  logout(req, res) {
    res.json({ message: "Sesión cerrada correctamente" });
  }

  // Método para olvidar contraseña
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

      const code = Math.floor(10000 + Math.random() * 90000).toString();
      const expiration = Date.now() + 3600000;

      user.resetPasswordCode = code;
      user.resetPasswordExpires = expiration;
      await user.save();

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        to: email,
        subject: "Recuperación de contraseña",
        html: `
          <h2>Confirma que eres tú</h2>
          <p>Hola, ${user.nombre || "usuario"}:</p>
          <p>Tu código para recuperar tu contraseña de COCINARTE es:</p>
          <div style="font-size: 24px; font-weight: bold;">${code}</div>
          <p>Este código es válido por 1 hora.</p>
        `,
      };

      await transporter.sendMail(mailOptions);

      res.json({ message: "Se ha enviado un código de recuperación a tu correo" });
    } catch (error) {
      res.status(500).json({ error: "Error al enviar correo" });
    }
  }

  // Método para verificar código de recuperación
  async verifyResetCode(req, res) {
    try {
      const { email, code } = req.body;
      const user = await User.findOne({
        where: {
          email,
          resetPasswordCode: code,
          resetPasswordExpires: { [Op.gt]: Date.now() },
        },
      });

      if (!user) return res.status(400).json({ error: "Código inválido o expirado" });
      res.json({ message: "Código verificado correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al verificar el código" });
    }
  }

  // Método para establecer nueva contraseña
  async setNewPassword(req, res) {
    try {
      const { email, code, newPassword } = req.body;

      const user = await User.findOne({
        where: {
          email,
          resetPasswordCode: code,
          resetPasswordExpires: { [Op.gt]: Date.now() },
        },
      });

      if (!user) return res.status(400).json({ error: "Código inválido o expirado" });

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetPasswordCode = null;
      user.resetPasswordExpires = null;

      await user.save();

      res.json({ message: "Contraseña actualizada correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al restablecer contraseña" });
    }
  }
}

// Exportamos una instancia de la clase
module.exports = new AuthController();
