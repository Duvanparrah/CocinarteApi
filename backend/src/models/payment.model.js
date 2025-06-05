const { DataTypes } = require("sequelize");
const { sequelize } = require("../db.js");

const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  cedula: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  metodo: {
    type: DataTypes.ENUM("tarjeta", "nequi"),
    allowNull: false
  },
  numero_tarjeta: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  fecha_expiracion: {
    type: DataTypes.STRING(7), // Ej: "12/26"
    allowNull: true
  },
  codigo_seguridad: {
    type: DataTypes.STRING(5),
    allowNull: true
  },
  numero_nequi: {
    type: DataTypes.STRING(10),
    allowNull: true,
    validate: {
      is: /^\d{10}$/i // Validación estricta de número Nequi (10 dígitos)
    }
  },
  monto: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 1 // No permite valores negativos ni cero
    }
  },
  estado: {
    type: DataTypes.ENUM("pendiente", "completado", "fallido"),
    defaultValue: "pendiente"
  },
  // Relaciones con usuarios y suscripciones
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'usuarios', // Nombre de la tabla relacionada
      key: 'id_usuario'  // Campo de la tabla relacionada
    },
    onDelete: 'SET NULL'  // Comportamiento al eliminar usuario
  },
  id_suscripcion: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'suscripciones_planes', // Nombre de la tabla relacionada
      key: 'id_suscripcion' // Campo de la tabla relacionada
    },
    onDelete: 'SET NULL'  // Comportamiento al eliminar suscripción
  }
}, {
  tableName: "pagos",  // Nombre de la tabla en la base de datos
  timestamps: true,    // Sequelize manejará `created_at` y `updated_at` automáticamente
  underscored: true    // Usa nombres de columnas en formato `snake_case`
});

module.exports = Payment;
