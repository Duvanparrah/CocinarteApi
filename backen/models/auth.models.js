const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("cocinarte_v2_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

// Definición del modelo Usuario
const Usuario = sequelize.define(
  "Usuario",
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre_usuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    foto_perfil: {
      type: DataTypes.TEXT,
    },
    tipo_usuario: {
      type: DataTypes.ENUM("usuario", "administrador", "administrador_lider"),
      defaultValue: "usuario",
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "usuarios",
  }
);

module.exports = Usuario;
