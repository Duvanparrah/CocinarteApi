const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Usuario = require("./auth.models");
const Receta = require("./recetas.models");

const Like = sequelize.define("Like", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  usuario_id: { type: DataTypes.INTEGER, allowNull: false },
  receta_id: { type: DataTypes.INTEGER, allowNull: false },
  fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: "likes",
  timestamps: false
});

// Asociación correcta con Usuario
Like.belongsTo(Usuario, { foreignKey: "usuario_id" });

// Asociación correcta con Receta — el foreignKey es receta_id, que es la FK en likes
Like.belongsTo(Receta, { foreignKey: "receta_id" });

module.exports = Like;
