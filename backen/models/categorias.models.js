const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db"); // Asegúrate de tener esta conexión bien definida

const Categoria = sequelize.define("Categoria", {
  id_categoria: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre_categoria: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  tipo_internacional: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: "categorias",
  timestamps: false
});

module.exports = Categoria;
