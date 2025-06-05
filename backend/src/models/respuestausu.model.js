const { DataTypes } = require("sequelize");
const { sequelize } = require("../db.js");

const RespuestaUsuarioPlan = sequelize.define("respuestas_usuario_plan", {
  id_respuesta: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios',
      key: 'id_usuario'
    },
    onDelete: 'CASCADE'
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  sexo: {
    type: DataTypes.ENUM('hombre', 'mujer'),
    allowNull: false
  },
  altura_cm: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false
  },
  peso_kg: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false
  },
  nivel_actividad: {
    type: DataTypes.ENUM(
      'sedentario', 
      'ligera actividad', 
      'moderadamente activo', 
      'muy activo', 
      'extremadamente activo'
    ),
    allowNull: false
  },
  entrenamiento_fuerza: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  fecha_respuesta: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'respuestas_usuario_plan',
  timestamps: false
});

// Asociaciones
RespuestaUsuarioPlan.associate = (models) => {
  RespuestaUsuarioPlan.belongsTo(models.Usuario, { foreignKey: 'id_usuario' });
  // ¡Ojo! No incluir asociación con PlanNutricional si no hay id_plan
};

module.exports = RespuestaUsuarioPlan;
