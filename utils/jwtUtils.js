const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "your-secret-key";  // Asegúrate de configurar este valor en tu archivo .env

// Función para generar un token JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, secret, { expiresIn: "1h" });  // El token expira en 1 hora
};

// Función para verificar un token JWT
const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error("Token inválido o expirado");
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
