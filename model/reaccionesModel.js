const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Importamos la configuración de la base de datos

const Reacciones = sequelize.define("Reacciones", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  likes: {
    type: DataTypes.JSON, // Usamos JSON para almacenar los likes como un arreglo de usuarios
    allowNull: false,
    defaultValue: [],
  },
  comentarios: {
    type: DataTypes.JSON, // Usamos JSON para almacenar los comentarios
    allowNull: false,
    defaultValue: [],
  },
  compartidos: {
    type: DataTypes.JSON, // Usamos JSON para almacenar los compartidos como un arreglo de usuarios
    allowNull: false,
    defaultValue: [],
  },
}, {
  timestamps: false, // Si no quieres que se añadan los campos createdAt/updatedAt
  tableName: 'reacciones', // Nombre de la tabla en la base de datos
});

module.exports = Reacciones;
