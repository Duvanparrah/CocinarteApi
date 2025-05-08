const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Asegúrate de que tienes la configuración de la base de datos

const Filtro = sequelize.define("Filtro", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipoComida: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  origen: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tiempoPreparacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dificultad: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // Opciones de configuración
  timestamps: false, // Si no quieres que se añadan los campos createdAt/updatedAt
  tableName: 'filtros', // Nombre de la tabla en la base de datos
});

module.exports = Filtro;
