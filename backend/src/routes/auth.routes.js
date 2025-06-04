const express = require("express");
const AuthController = require("../controllers/auth.controller.js");
const { validateSchema } = require("../middlewares/validator.middleware.js");
const { loginSchema, registerSchema } = require("../schemas/auth.shema.js");
const AuthMiddleware = require("../middlewares/auth.middleware.js");














//hooa

const router = express.Router();

// 🔹 Registro de usuario
router.post("/register", validateSchema(registerSchema), AuthController.register);

// 🔹 Login de usuario normal
router.post("/login", validateSchema(loginSchema), AuthController.login);

// 🔹 Login exclusivo para administradores o líderes
router.post("/login-admin", validateSchema(loginSchema), AuthController.loginAdminLider);

// 🔍 Verificar token y obtener datos del usuario autenticado
router.get("/verify", AuthMiddleware.auth, AuthController.verifyToken);

// 🚪 Cerrar sesión (requiere estar autenticado para invalidar correctamente la cookie)
router.post("/logout", AuthMiddleware.auth, AuthController.logout);

module.exports = router;
