const { DataTypes } = require("sequelize");
const { sequelize } = require("../db.js");

const IngredientesPersonalizadosPlan = sequelize.define("IngredientesPersonalizadosPlan", {
  id_plan: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,  // Clave primaria en combinación con id_ingrediente
    references: {
      model: 'planes_nutricionales', // nombre real de la tabla en la DB
      key: 'id_plan'
    },
    onDelete: 'CASCADE'
  },
  id_ingrediente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,  // Clave primaria en combinación con id_plan
    references: {
      model: 'ingredientes', // nombre real de la tabla en la DB
      key: 'id_ingrediente'
    },
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'ingredientes_personalizados_plan',
  timestamps: false
});

// Relaciones (asociaciones) con los otros modelos
IngredientesPersonalizadosPlan.associate = (models) => {
  // Relación con el modelo PlanNutricional
  IngredientesPersonalizadosPlan.belongsTo(models.PlanNutricional, { 
    foreignKey: 'id_plan', 
    onDelete: 'CASCADE'
  });

  // Relación con el modelo Ingrediente
  IngredientesPersonalizadosPlan.belongsTo(models.Ingrediente, { 
    foreignKey: 'id_ingrediente', 
    onDelete: 'CASCADE'
  });
};

module.exports = IngredientesPersonalizadosPlan;
