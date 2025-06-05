const { DataTypes } = require("sequelize");
const db=require("../config/db")
const Usuario = require("./auth.models");

const Notificacion = db.define("Notificacion", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuario_id: { type: DataTypes.INTEGER, allowNull: false },
    tipo: {
        type: DataTypes.ENUM("Compra Plan", "Comentario", "Like", "Reporte", "Advertencia"),
        allowNull: false
    },
    mensaje: { type: DataTypes.TEXT, allowNull: false },
    fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    leida: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { tableName: "notificaciones", timestamps: false });

Notificacion.belongsTo(Usuario, { foreignKey: "usuario_id" });

module.exports = Notificacion;
