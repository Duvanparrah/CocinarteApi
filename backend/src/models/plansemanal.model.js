const { DataTypes } = require("sequelize");
const { sequelize } = require("../db.js");
const PlanNutricional = require("./plan.model.js");

const PlanNutricionalSemanal = sequelize.define("PlanNutricionalSemanal", {
  id_semana: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_plan: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PlanNutricional,  // Relación con PlanNutricional
      key: "id_plan",
    },
    onDelete: "CASCADE",
  },
  fecha_inicio: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
    },
  },
  fecha_fin: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
    },
  },
  calorias_dia: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  proteinas_dia: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  grasas_dia: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  carbohidratos_dia: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  agua_dia_litros: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
}, {
  tableName: "planes_nutricionales_semanales",
  timestamps: false,
});

// **Definir la relación con PlanNutricional en el mismo modelo**
PlanNutricionalSemanal.belongsTo(PlanNutricional, { foreignKey: "id_plan", as: "planNutricional" });

module.exports = PlanNutricionalSemanal;
