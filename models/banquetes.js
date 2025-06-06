const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database'); // Asegúrate que esta ruta apunte a tu conexión Sequelize

const Banquete = sequelize.define('Banquete', {
  id_banquete: {
    type: DataTypes.INTEGER,
    primaryKey: true, // Clave primaria
    autoIncrement: true, // Se auto incrementa
    allowNull: false
  },
  titulo: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  tipo_preparacion: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  dificultad: {
    type: DataTypes.ENUM('Fácil', 'Media', 'Difícil'),
    allowNull: true
  },
  metodo_preparacion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  num_personas: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  imagen_url: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  tener_en_cuenta: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios', // La tabla relacionada
      key: 'id_usuario'  // La columna de la tabla usuarios
    },
    onDelete: 'CASCADE' // Si se elimina el usuario, se eliminan los banquetes asociados
  }
}, {
  timestamps: false // Desactivamos timestamps para usar solo la columna fecha_creacion
});

// Hook para validar y procesar los ingredientes antes de crear el banquete (si se necesita)
Banquete.beforeCreate((banquete, options) => {
  // Aquí podrías agregar algún tipo de validación o procesamiento si es necesario
  // Ejemplo: procesar ingredientes, etc.
});

module.exports = Banquete;
