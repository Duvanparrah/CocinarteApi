const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db"); // ✅ Importación correcta

const Usuario = require("./auth.models");

const PlanNutricional = sequelize.define("PlanNutricional", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuario_id: { type: DataTypes.INTEGER, allowNull: false },
    objetivo: {
        type: DataTypes.ENUM("Perder Grasa", "Ganar Masa Muscular", "Mantener Peso"),
        allowNull: false
    },
    sexo: {
        type: DataTypes.ENUM("Masculino", "Femenino"),
        allowNull: false
    },
    edad: { type: DataTypes.INTEGER, allowNull: false },
    altura: { type: DataTypes.DECIMAL(4,2), allowNull: false },
    peso: { type: DataTypes.DECIMAL(5,2), allowNull: false },
    nivel_actividad: {
        type: DataTypes.ENUM(
            "Sedentario", "Ligera Actividad", "Moderadamente Activo", 
            "Muy Activo", "Extremadamente Activo"
        ),
        allowNull: false
    },
    entrenamiento_fuerza: { type: DataTypes.BOOLEAN, allowNull: false },
    ingredientes_seleccionados: { type: DataTypes.TEXT, allowNull: false },
    calorias_diarias: { type: DataTypes.INTEGER, allowNull: false },
    proteinas_diarias: { type: DataTypes.DECIMAL(6,2), allowNull: false },
    carbohidratos_diarios: { type: DataTypes.DECIMAL(6,2), allowNull: false },
    grasas_diarias: { type: DataTypes.DECIMAL(6,2), allowNull: false },
    consumo_agua_diario: { type: DataTypes.DECIMAL(6,2), allowNull: true },
    plan_semanal: { type: DataTypes.TEXT, allowNull: false },
    tipo_plan: { type: DataTypes.ENUM("Gratis", "Pago"), defaultValue: "Gratis", allowNull: false },
    funciones_limitadas: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false },
    fecha_activacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    fecha_expiracion: { type: DataTypes.DATE, allowNull: true },
    estado_plan: { type: DataTypes.ENUM("Activo", "Cancelado", "Finalizado"), defaultValue: "Activo" }
}, { tableName: "planes_nutricionales", timestamps: false });

PlanNutricional.belongsTo(Usuario, { foreignKey: "usuario_id" });

module.exports = PlanNutricional;
