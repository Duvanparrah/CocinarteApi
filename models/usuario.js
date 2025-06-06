const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database'); // Tu archivo de configuración de Sequelize

const Usuario = sequelize.define('Usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_usuario: { // Cambié el nombre de la columna a nombre_usuario para coincidir con el esquema de MySQL
    type: DataTypes.STRING(100),
    allowNull: false
  },
  correo: { // Cambié el nombre de la columna a correo para coincidir con el esquema de MySQL
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true // Asegura que el valor insertado sea un correo electrónico
    }
  },
  contraseña: { // Cambié el nombre de la columna a contraseña para coincidir con el esquema de MySQL
    type: DataTypes.STRING(255),
    allowNull: false
  },
  foto_perfil: { // Esta columna es opcional, corresponde a la columna TEXT en MySQL
    type: DataTypes.TEXT,
    allowNull: true
  },
  fecha_registro: { // Esta columna se define con un valor por defecto
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  tipo_usuario: { // Cambié el nombre de la columna a tipo_usuario para coincidir con el esquema de MySQL
    type: DataTypes.ENUM('normal', 'administrador', 'admin_lider'),
    defaultValue: 'normal',
    allowNull: false
  }
}, {
  tableName: 'usuarios', // Nombre de la tabla en MySQL
  timestamps: false, // Si no estás utilizando createdAt / updatedAt
  hooks: {
    beforeCreate: async (usuario) => {
      if (usuario.contraseña) {
        const salt = await bcrypt.genSalt(10);
        usuario.contraseña = await bcrypt.hash(usuario.contraseña, salt);
      }
    },
    beforeUpdate: async (usuario) => {
      if (usuario.changed('contraseña')) {
        const salt = await bcrypt.genSalt(10);
        usuario.contraseña = await bcrypt.hash(usuario.contraseña, salt);
      }
    }
  },
  defaultScope: {
    attributes: { exclude: ['contraseña'] } // No devolver la contraseña en los resultados por defecto
  },
  scopes: {
    withPassword: {
      attributes: {} // Incluir la contraseña si es necesario
    }
  }
});

// Método para comparar contraseñas
Usuario.prototype.compararContrasena = async function (contrasena) {
  return await bcrypt.compare(contrasena, this.contraseña);
};

module.exports = Usuario;
