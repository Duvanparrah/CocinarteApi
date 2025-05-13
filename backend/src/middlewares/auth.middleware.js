const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config.js");

class AuthMiddleware {
  // 🔐 Autenticación general
  static auth(req, res, next) {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No se proporcionó el token de autenticación" });
    }

    try {
      const decoded = jwt.verify(token, TOKEN_SECRET);
      req.user = decoded; // Guardamos los datos del token en la solicitud
      next();
    } catch (error) {
      return res.status(401).json({ message: "Token inválido o expirado" });
    }
  }

  // 🧾 Solo usuarios comunes
  static onlyUsers(req, res, next) {
    const rol = req.user?.rol;

    if (rol === "normal") {
      return next();
    }

    return res.status(403).json({ message: "Acceso denegado: solo los usuarios comunes pueden realizar pagos" });
  }

  // 🛠️ Solo administradores o líderes
  static onlyAdminsOrLeaders(req, res, next) {
    const rol = req.user?.rol;

    if (rol === "administrador" || rol === "admin_lider") {
      return next();
    }

    return res.status(403).json({ message: "Acceso denegado: solo administradores o líderes pueden gestionar " });
  }
}

module.exports = AuthMiddleware;
