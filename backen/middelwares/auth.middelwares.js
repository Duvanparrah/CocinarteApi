// middlewares/validarToken.js
const jwt = require("jsonwebtoken");
const TokenRevocado = require("../models/blacckToken"); // Asegúrate de que este modelo exista y funcione

const validarToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Acceso denegado. Token no proporcionado o mal formateado." });
    }

    const token = authHeader.split(" ")[1];

    // Revisar si el token fue revocado
    const tokenRevocado = await TokenRevocado.findOne({ where: { token } });
    if (tokenRevocado) {
      return res.status(401).json({ message: "Token revocado. Por favor, inicie sesión nuevamente." });
    }

    // Verifica el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Asegúrate de que `decoded` incluya un `id`
    if (!decoded.id_usuario) {
      return res.status(403).json({ message: "Token inválido. No contiene el ID del usuario." });
    }

    // Asignamos el usuario al request para poder usarlo después
    req.usuario = { id: decoded.id_usuario };
    next();
  } catch (error) {
    console.error("❌ Error de autenticación:", error.message);
    return res.status(403).json({ error: "Token inválido o expirado.", detalle: error.message });
  }
};

module.exports = validarToken;
