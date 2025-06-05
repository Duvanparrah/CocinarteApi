const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Usuario = require("../models/auth.models");

const Receta = sequelize.define("Receta", {
  id_receta: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: "id_usuario"
    }
  },
  titulo: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  imagen: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  tiempo_preparacion: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  dificultad: {
    type: DataTypes.ENUM("Fácil", "Media", "Difícil"),
    allowNull: true,
  },
  calorias: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  proteinas: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  carbohidratos: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  grasas: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  azucar: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  seccion: {
    type: DataTypes.ENUM("comunidad", "inicio"),
    allowNull: true,
  },
  id_categoria: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  fecha_edicion: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  editado: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  }
}, {
  tableName: "recetas", // ← Importante si el nombre en la base de datos no es plural
  timestamps: false,
});

// Relaciones
Receta.belongsTo(Usuario, {
  foreignKey: "id_usuario"
});

module.exports = Receta;
