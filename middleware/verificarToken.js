// middleware/verificarToken.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  try {
    const verificado = jwt.verify(token, JWT_SECRET);
    req.admin = verificado;
    next();
  } catch (err) {
    res.status(403).json({ mensaje: 'Token inválido' });
  }
};

module.exports = verificarToken;
