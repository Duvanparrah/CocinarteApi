// db.js
const { Sequelize } = require("sequelize");
require("dotenv").config(); // Carga variables .env

console.log("Conectando con usuario:", process.env.DB_USER); // 👈 Verifica que lea root

const sequelize = new Sequelize(
  process.env.DB_NAME,     // cocinarte_db
  process.env.DB_USER,     // root
  process.env.DB_PASSWORD, // (vacía)
  {
    host: process.env.DB_HOST, // localhost
    dialect: "mysql",
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a MySQL establecida!");
  } catch (error) {
    console.error("❌ Error al conectar a MySQL:", error.message);
  }
};

module.exports = { sequelize, connectDB };
