const { DataTypes } = require("sequelize");
const { sequelize } = require("../db.js");

const DiaPlanNutricional = sequelize.define("DiaPlanNutricional", {
  id_dia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_semana: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "planes_nutricionales_semanales",
      key: "id_semana",
    },
    onDelete: "CASCADE",
  },
  nombre_dia: {
    type: DataTypes.ENUM("Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"),
    allowNull: false,
  }
}, {
  tableName: "dias_plan_nutricional",
  timestamps: false,
});

// ✅ Asegurar la exportación correcta
module.exports = DiaPlanNutricional;
