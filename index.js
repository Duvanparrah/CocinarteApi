require('dotenv').config(); // Importante para cargar el .env

const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/database.js'); // Conexión MySQL
const PORT = process.env.PORT || 5000;
const crearCarpetaUploads = require('./utils/createUploadsFolder');
const crearAdminPorDefecto = require('./utils/crearAdminPorDefecto.js'); // IMPORTANTE

crearCarpetaUploads();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
const adminRoutes = require('./routes/adminRoutes.js');
const recetasRoutes = require('./routes/recetaRoutes.js');
const inicioRoutes = require('./routes/inicioRoutes.js');
const banquetesRoutes = require('./routes/banquetesRoutes.js');
const inconsistenciasRoutes = require('./routes/inconsistenciasRoutes.js');
const ingredientesRoutes = require('./routes/ingredientesRoutes.js');
const usuarioRoutes = require('./routes/usuarioRoutes.js');

app.use('/api/admin', adminRoutes);
app.use('/api/recetas', recetasRoutes);
app.use('/api/inicio', inicioRoutes);
app.use('/api/banquetes', banquetesRoutes);
app.use('/api/inconsistencias', inconsistenciasRoutes);
app.use('/api/ingredientes', ingredientesRoutes);
app.use('/api/usuario', usuarioRoutes);

// Función de conexión y sincronización
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado a MySQL');

    await sequelize.sync({ alter: true });

    // 👉 Aquí agregamos la creación automática del admin
    await crearAdminPorDefecto();

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error de conexión a MySQL:', error);
  }
};

// Iniciar el servidor
startServer();
