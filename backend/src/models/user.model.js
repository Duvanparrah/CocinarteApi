const { DataTypes } = require("sequelize");
const { sequelize } = require("../db.js");


const Usuario = sequelize.define("Usuario", {
  id_usuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre_usuario: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true // ✅ Valida que sea un correo válido
    }
  },
  contraseña: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  foto_perfil: {
    type: DataTypes.TEXT,
    allowNull: true
  },
 
  tipo_usuario: {
    type: DataTypes.ENUM("normal", "administrador", "admin_lider"),
    defaultValue: "normal"
  }
}, {
  tableName: "usuarios",
  timestamps: false,
  hooks: {
    
  }
});

module.exports = Usuario;
