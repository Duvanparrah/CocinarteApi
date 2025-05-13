const { DataTypes } = require("sequelize");
const { sequelize } = require("../db.js");

const PlanNutricional = sequelize.define('PlanNutricional', {
  id_plan: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre_plan: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  objetivo: {
    type: DataTypes.ENUM('bajar de peso', 'mantener peso', 'ganar músculo'),
    allowNull: false
  },
  calorias: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  proteinas: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  grasas: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  carbohidratos: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  azucar_total: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  comidas_por_dia: {
    type: DataTypes.INTEGER,
    defaultValue: 3
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'usuarios',
      key: 'id_usuario'
    },
    onDelete: 'SET NULL'
  }
}, {
  tableName: 'planes_nutricionales',
  timestamps: false
});

// Asociaciones (si necesitas asociar con otros modelos, por ejemplo, con el modelo Usuario)
PlanNutricional.associate = (models) => {
  PlanNutricional.belongsTo(models.Usuario, { foreignKey: 'id_usuario' });

};

module.exports = PlanNutricional;
