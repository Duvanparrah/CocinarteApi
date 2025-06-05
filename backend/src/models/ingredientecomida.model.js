const { DataTypes } = require("sequelize");
const { sequelize } = require("../db.js");
const ComidaDia = require("./comidadia.model.js");

const IngredientePorComida = sequelize.define("IngredientePorComida", {
  id_ingrediente_comida: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_comida: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ComidaDia, // ✅ Referencia directa al modelo, no una cadena de texto
      key: "id_comida"
    },
    onDelete: "CASCADE"
  },
  nombre_ingrediente: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  cantidad: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  preparacion: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: "ingredientes_comida",
  timestamps: false
});

// ✅ Definir la relación con `ComidaDia` dentro del modelo
IngredientePorComida.belongsTo(ComidaDia, { foreignKey: "id_comida", as: "comida" });
ComidaDia.hasMany(IngredientePorComida, { foreignKey: "id_comida", as: "ingredientes" });

module.exports = IngredientePorComida;
