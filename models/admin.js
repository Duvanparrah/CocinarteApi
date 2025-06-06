// models/admin.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Administrador = sequelize.define('Administrador', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true, // Validación del formato del correo
      notEmpty: true // No permitir correos vacíos
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 100] // Contraseña debe tener al menos 8 caracteres
    }
  }
}, {
  timestamps: true, 
  tableName: 'administradores',
  createdAt: 'fecha_creacion',   // Si deseas personalizar el nombre de las fechas
  updatedAt: 'fecha_actualizacion'
});

module.exports = Administrador;
