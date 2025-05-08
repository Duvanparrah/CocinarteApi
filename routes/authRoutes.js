// routes/authRoutes.js

const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const { authenticate } = require("../middlewares/authMiddleware");



// Ruta para registrar un usuario
router.post("/register", authController.register);

// Ruta para iniciar sesión
router.post("/login", authController.login);

// Ruta para registro con Google
router.post("/register/google", authController.registerWithGoogle);

// Ruta para obtener perfil de usuario
router.get("/profile", authenticate, authController.getProfile);

// Ruta para actualizar perfil de usuario
router.put("/profile", authenticate, authController.updateProfile);

// Ruta para agregar favorito
router.post("/favorites", authenticate, authController.addFavorite);

// Ruta para eliminar favorito
router.delete("/favorites", authenticate, authController.removeFavorite);

// Ruta para obtener notificaciones
router.get("/notifications", authenticate, authController.getNotifications);

// Ruta para agregar notificación
router.post("/notifications", authenticate, authController.addNotification);

// Ruta para cerrar sesión (logout)
router.post("/logout", authenticate, authController.logout);

// Ruta para olvidar contraseña
router.post("/forgot-password", authController.forgotPassword);

// Ruta para verificar el código de recuperación de contraseña
router.post("/verify-reset-code", authController.verifyResetCode);

// Ruta para establecer nueva contraseña
router.post("/set-new-password", authController.setNewPassword);

module.exports = router;
