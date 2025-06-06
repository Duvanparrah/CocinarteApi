const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ingrediente = sequelize.define('Ingrediente', {
  id_ingrediente: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  nombre_ingrediente: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true // Asegura que el nombre no esté vacío
    }
  },
  imagen: {
    type: DataTypes.STRING, // Usamos STRING en lugar de TEXT si las URLs son cortas
    validate: {
      isUrl: true // Asegura que la imagen sea una URL válida
    }
  },
  categoria: {
    type: DataTypes.ENUM(
      'Verduras', 'Frutas', 'Carnes', 'Pescados y Mariscos', 'Lácteos', 
      'Granos y Legumbres', 'Cereales', 'Huevos', 'Hierbas y Especias', 
      'Frutos secos y Semillas', 'Aceites y Grasas', 'Endulzantes', 
      'Productos Procesados', 'Bebidas', 'Harinas y Derivados', 'Salsas y Condimentos'
    ),
    allowNull: false
  },
  calorias_por_100g: {
    type: DataTypes.DECIMAL(6, 2),
    defaultValue: 0.00
  },
  proteinas_por_100g: {
    type: DataTypes.DECIMAL(6, 2),
    defaultValue: 0.00
  },
  carbohidratos_por_100g: {
    type: DataTypes.DECIMAL(6, 2),
    defaultValue: 0.00
  },
  grasas_totales_por_100g: {
    type: DataTypes.DECIMAL(6, 2),
    defaultValue: 0.00
  },
  azucar_por_100g: {
    type: DataTypes.DECIMAL(6, 2),
    defaultValue: 0.00
  },
  unidad: {
    type: DataTypes.STRING(50),
    defaultValue: 'gramos' // Puede ser gramos, ml, unidad, etc.
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  fibra: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  sodio: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: false // Desactiva las marcas de tiempo (createdAt y updatedAt) si no las necesitas
});

module.exports = Ingrediente;
