const Banquete = require('../models/banquetes');
const Usuario = require('../models/usuario'); // Asegúrate de importar el modelo Usuario si es necesario

class BanqueteController {
  // Método para crear un nuevo banquete
  static async crearBanquete(req, res) {
    try {
      const {
        titulo,
        descripcion,
        tipo_preparacion,
        dificultad,
        metodo_preparacion,
        num_personas,
        imagen_url,
        tener_en_cuenta,
        id_usuario
      } = req.body;

      // Validación de campos obligatorios
      if (!titulo || !descripcion || !num_personas || !id_usuario) {
        return res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
      }

      // Validar que el usuario existe
      const usuario = await Usuario.findByPk(id_usuario);
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }

      // Manejo de imagen subida (si existe)
      const foto = req.file ? req.file.filename : 'default.jpg'; // Usamos 'default.jpg' si no se sube una imagen

      // Crear el nuevo banquete en la base de datos
      const nuevoBanquete = await Banquete.create({
        titulo,
        descripcion,
        tipo_preparacion,
        dificultad,
        metodo_preparacion,
        num_personas,
        imagen_url: foto, // Usamos la imagen subida o la predeterminada
        tener_en_cuenta,
        id_usuario
      });

      // Respuesta exitosa
      res.status(201).json(nuevoBanquete);
    } catch (error) {
      console.error("❌ Error al crear banquete:", error);
      res.status(500).json({ mensaje: 'Error al crear banquete', error: error.message });
    }
  }

  // Método para obtener todos los banquetes
  static async obtenerBanquetes(req, res) {
    try {
      const banquetes = await Banquete.findAll({
        order: [['fecha_creacion', 'DESC']] // Ordenamos por la fecha de creación en orden descendente
      });
      res.status(200).json(banquetes);
    } catch (error) {
      console.error("❌ Error al obtener banquetes:", error);
      res.status(500).json({ mensaje: 'Error al obtener banquetes', error: error.message });
    }
  }

  // Método para subir una imagen de banquete
  static async subirImagen(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ mensaje: 'No se subió ninguna imagen' });
      }

      res.status(200).json({
        mensaje: 'Imagen subida con éxito',
        nombreArchivo: req.file.filename
      });
    } catch (error) {
      console.error("❌ Error al subir imagen:", error);
      res.status(500).json({ mensaje: 'Error al subir imagen', error: error.message });
    }
  }
}

module.exports = BanqueteController;
