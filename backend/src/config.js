const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 4200,

  // MongoDB
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost/proyecto",

  // MySQL
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_NAME: process.env.DB_NAME || "cocinarte_db",

  // Otros
  TOKEN_SECRET: process.env.TOKEN_SECRET || "secret",
  STRIPE_PRIVATE_KEY: process.env.STRIPE_PRIVATE_KEY,
  // FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173"
};
