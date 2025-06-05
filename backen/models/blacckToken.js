// models/TokenRevocado.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db").sequelize;

const TokenRevocado = sequelize.define("TokenRevocado", {
  token: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fecha_revocacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "token_revoked",
  timestamps: false,
});

module.exports = TokenRevocado;
