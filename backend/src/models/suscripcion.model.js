const { DataTypes } = require("sequelize");
const { sequelize } = require("../db.js");
const Usuario = require("./user.model.js");
const TipoPlan = require("./plan.model.js");
const Pago = require("./payment.model.js");

const Suscripcion = sequelize.define("Suscripcion", {
  id_suscripcion: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_tipo_plan: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha_inicio: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  fecha_fin: {
    type: DataTypes.DATE
  },
  estado: {
    type: DataTypes.ENUM("activa", "expirada", "cancelada"),
    defaultValue: "activa"
  }
}, {
  tableName: "suscripciones_planes",
  timestamps: false
});
Suscripcion.belongsTo(Usuario, {
  foreignKey: "id_usuario",
  as: "usuario"
});

Suscripcion.belongsTo(TipoPlan, {
  foreignKey: "id_tipo_plan",
  as: "tipoPlan"
});

Suscripcion.hasMany(Pago, {
  foreignKey: "id_suscripcion",
  as: "pagos"
});


module.exports = Suscripcion;
