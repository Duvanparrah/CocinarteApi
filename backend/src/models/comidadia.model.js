const { DataTypes } = require("sequelize");
const { sequelize } = require("../db.js");
const DiaPlanNutricional = require("../models/diaplan.model.js");

const ComidaDia = sequelize.define("ComidaDia", {
  id_comida: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_dia: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: DiaPlanNutricional,  // ✅ Se corrige la referencia al modelo directamente
      key: "id_dia"
    },
    onDelete: "CASCADE"
  },
  tipo_comida: {
    type: DataTypes.ENUM("Desayuno", "Almuerzo", "Cena", "Snack"),
    allowNull: false
  },
  kcal: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  proteinas: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  carbohidratos: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  grasas: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: "comidas_dia",
  timestamps: false
});

// ✅ Definir correctamente la relación con `DiaPlanNutricional`
ComidaDia.belongsTo(DiaPlanNutricional, { foreignKey: "id_dia", as: "dia" });

module.exports = ComidaDia;
