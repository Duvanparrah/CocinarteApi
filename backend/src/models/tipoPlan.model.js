const { DataTypes } = require("sequelize");
const { sequelize } = require("../db.js");

const TipoPlan = sequelize.define('tipos_planes', {
  id_tipo_plan: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre_plan: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  duracion_dias: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  }
}, {
  tableName: 'tipos_planes',
  timestamps: false
});

module.exports = TipoPlan;
