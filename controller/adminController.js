// controllers/adminController.js

const Administrador = require('../models/admin'); // Modelo de Administrador
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

class adminController {
  // Login del administrador
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Verificar que los campos no estén vacíos
      if (!email || !password) {
        return res.status(400).json({ mensaje: 'Correo y contraseña son obligatorios' });
      }

      // Verificar si el administrador predeterminado existe (puedes usar el email del administrador predeterminado)
      const admin = await Administrador.findOne({ where: { email: 'naviamunozcarloseduardo@gmail.com' } });

      // Si el administrador no existe
      if (!admin) {
        return res.status(404).json({ mensaje: 'Administrador no encontrado' });
      }

      // Verificar la contraseña
      const passwordValido = await bcrypt.compare(password, admin.password);
      if (!passwordValido) {
        return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
      }

      // Generar el token JWT para la autenticación
      const token = jwt.sign({ id: admin.id }, JWT_SECRET, { expiresIn: '2h' });

      // Enviar respuesta con el token
      res.status(200).json({ mensaje: 'Login exitoso', token });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ mensaje: 'Error al iniciar sesión', error: error.message });
    }
  }
}

module.exports = adminController;
