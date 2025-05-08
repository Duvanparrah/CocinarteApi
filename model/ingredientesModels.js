const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Ingrediente = sequelize.define("Ingrediente", {
  id_ingrediente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_ingrediente: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  imagen: {
    type: DataTypes.TEXT
  },
  categoria: {
    type: DataTypes.ENUM(
      'Verduras',
      'Frutas',
      'Carnes',
      'Pescados y Mariscos',
      'Lácteos',
      'Granos y Legumbres',
      'Cereales',
      'Huevos',
      'Hierbas y Especias',
      'Frutos secos y Semillas',
      'Aceites y Grasas',
      'Endulzantes',
      'Productos Procesados',
      'Bebidas',
      'Harinas y Derivados',
      'Salsas y Condimentos'
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
    defaultValue: 'gramos'
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    onUpdate : Sequelize.literal('CURRENT_TIMESTAMP')
  }
}, {
  tableName: "ingredientes",
  timestamps: false
});

module.exports = Ingrediente;
  // Asegúrate de exportar el modelo correctamente
