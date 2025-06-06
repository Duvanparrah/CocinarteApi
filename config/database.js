const { Sequelize } = require('sequelize');
require('dotenv').config(); // Importante para cargar las variables de entorno desde el .env

// Configurar la conexión a MySQL con Sequelize
const sequelize = new Sequelize(
  process.env.MYSQL_DB, // Nombre de la base de datos
  process.env.MYSQL_USER, // Usuario
  process.env.MYSQL_PASSWORD, // Contraseña
  {
    host: process.env.MYSQL_HOST, // Dirección del servidor de base de datos
    dialect: 'mysql', // Usamos MySQL
    logging: false, // Puedes poner true si quieres ver las consultas SQL
    dialectOptions: {
    },
    timezone: '+00:00', // Configurar la zona horaria
  }
);

// Verificar la conexión
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa a la base de datos.');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
    process.exit(1); // Terminar la aplicación si no se puede conectar
  }
};

testConnection();

module.exports = sequelize;
