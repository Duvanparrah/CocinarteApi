const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db"); // ✅ Importación correcta


const Comentario = sequelize.define("Comentario", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "usuarios", key: "id_usuario" }
    },
    receta_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "recetas", key: "id_receta" }
    },
    contenido: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    fecha_edicion: {
        type: DataTypes.DATE,
        allowNull: true
    },
    editado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: false
});

module.exports = Comentario;
