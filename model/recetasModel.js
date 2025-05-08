// models/recetasModel.js
// models/recetasModel.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Asegúrate de que la configuración de Sequelize esté bien configurada

class Receta extends Model {}

Receta.init(
  {
    id_receta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tipo_preparacion: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    dificultad: {
      type: DataTypes.ENUM('fácil', 'media', 'difícil'),
      defaultValue: 'fácil',
    },
    tiempo_preparacion: {
      type: DataTypes.INTEGER,
      allowNull: true, // Tiempo en minutos
    },
    imagen: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    categoria: {
      type: DataTypes.ENUM(
        'Comida Internacional',
        'Sopas y Cremas',
        'Ensaladas y verduras',
        'Bebidas',
        'Panadería y Repostería',
        'Pastas y Arroces',
        'Pescados y Mariscos',
        'Carnes y aves',
        'Comida Rápida y Callejera'
      ),
      allowNull: true,
    },
    fuente: {
      type: DataTypes.ENUM('administrador', 'usuario'),
      defaultValue: 'usuario',
    },
    azucar_total: {
      type: DataTypes.DECIMAL(6, 2),
      defaultValue: 0.00,
    },
    calorias: {
      type: DataTypes.DECIMAL(6, 2),
      defaultValue: 0.00,
    },
    proteinas: {
      type: DataTypes.DECIMAL(6, 2),
      defaultValue: 0.00,
    },
    carbohidratos: {
      type: DataTypes.DECIMAL(6, 2),
      defaultValue: 0.00,
    },
    grasas_totales: {
      type: DataTypes.DECIMAL(6, 2),
      defaultValue: 0.00,
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    fecha_actualizacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Receta',
    tableName: 'recetas',
    timestamps: false, // Deshabilitamos los timestamps
  }
);

module.exports = Receta;
