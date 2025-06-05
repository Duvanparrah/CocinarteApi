const { verifyToken } = require("../utils/jwtUtils");

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Acceso no autorizado" });
  }

  try {
    const decoded = verifyToken(token);  // Usamos la función verifyToken para verificar el token
    req.user = decoded; // Agregar el usuario decodificado a la solicitud
    next(); // Pasar al siguiente middleware o controlador
  } catch (error) {
    return res.status(401).json({ error: error.message }); // Mostrar mensaje de error adecuado
  }
};

module.exports = { authenticate };
