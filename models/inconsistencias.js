const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./usuario'); // Asegúrate de tener este modelo

const Inconsistencia = sequelize.define('Inconsistencia', {
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM('registro', 'dato', 'otro'),
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'aprobada', 'rechazada'),
    defaultValue: 'pendiente'
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario, // Referencia directa al modelo
      key: 'id_usuario'
    }
  }
}, {
  timestamps: true
});

// Asociación con el modelo Usuario
Inconsistencia.belongsTo(Usuario, { foreignKey: 'usuarioId', targetKey: 'id_usuario', as: 'usuario' });

module.exports = Inconsistencia;

