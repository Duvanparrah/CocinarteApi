require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db"); // conexión a MySQL con Sequelize

const server = express();
const PORT = process.env.PORT || 5000;

// Middlewares
server.use(cors());
server.use(express.json());

// Probar conexión a MySQL y sincronizar modelos
sequelize.authenticate()
  .then(() => {
    console.log("✅ Conectado a MySQL");
    return sequelize.sync(); // O usar { alter: true } o { force: true } según necesidad
  })
  .then(() => {
    console.log("🔄 Modelos sincronizados con MySQL");
  })
  .catch((error) => {
    console.error("❌ Error conectando a MySQL:", error);
  });

// Rutas
const authRoutes = require("./routes/authRoutes");
const filtroRoutes = require("./routes/filtrosRoutes");
const recetaRoutes = require("./routes/recetaRoutes");
const ingredientesRoutes = require("./routes/ingredientesRoutes");
const reaccionesRoutes = require("./routes/reaccionesRoutes");

// Usar rutas
server.use("/api/auth", authRoutes);
server.use("/api", filtroRoutes);
server.use("/api", recetaRoutes);
server.use("/api", ingredientesRoutes);
server.use("/api/reacciones", reaccionesRoutes);

// Ruta raíz de prueba
server.get("/", (req, res) => {
  res.json({ mensaje: "¡Bienvenido a la API de CocinArte con MySQL!" });
});

// Iniciar servidor
server.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
