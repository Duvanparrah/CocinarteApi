const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { connectDB, sequelize } = require("./config/db");
const validarToken = require("./middelwares/auth.middelwares");

const authRoutes = require("./routes/auth.routes");
const comentarioRoutes = require("./routes/comentarios.routes");
const recetaRoutes = require("./routes/retas.routes");
const notificacionRoutes = require("./routes/notificaciones.routes");
const likeRoutes = require("./routes/likes.routes");
const favoritosRoutes = require("./routes/favoritos.routes");
const categoriaRoutes = require("./routes/categorias.routes");
const planutricionalRoutes = require("./routes/planutricional.routes");

const app = express();
const PORT = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Rutas públicas (sin token)
app.use("/api/auth", authRoutes);

// Rutas protegidas (con token)
app.use("/api/comentarios", validarToken, comentarioRoutes);
app.use("/api/recetas", validarToken, recetaRoutes);
app.use("/api/notificaciones", validarToken, notificacionRoutes);
app.use("/api/likes", validarToken, likeRoutes);
app.use("/api/favoritos", validarToken, favoritosRoutes);
app.use("/api/categorias", validarToken, categoriaRoutes);
app.use("/api/planutricional", validarToken, planutricionalRoutes);

// Conectar la base de datos y sincronizar modelos
connectDB()
  .then(() => {
    console.log("✅ Base de datos conectada exitosamente.");

    return sequelize.sync({ alter: true }); // Sincroniza modelos
  })
  .then(() => console.log("📂 Modelos sincronizados con MySQL"))
  .catch((err) => console.error("❌ Error al sincronizar modelos:", err));

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
