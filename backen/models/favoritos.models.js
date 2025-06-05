const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db"); // ✅ Importación correcta

const Usuario = require("./auth.models");
const Receta = require("./recetas.models");

const Favorito = sequelize.define("Favorito", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuario_id: { type: DataTypes.INTEGER, allowNull: false },
    receta_id: { type: DataTypes.INTEGER, allowNull: false },
    fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: "favoritos", timestamps: false });

Favorito.belongsTo(Usuario, { foreignKey: "usuario_id" });
Favorito.belongsTo(Receta, { foreignKey: "receta_id" });

module.exports = Favorito;
