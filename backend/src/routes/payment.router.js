const express = require("express");
const PaymentController = require("../controllers/payment.controller.js");
const { validateSchema } = require("../middlewares/validator.middleware.js");
const { paymentSchema } = require("../schemas/payment.shema.js");
const { auth, onlyUsers, onlyAdminsOrLeaders } = require("../middlewares/auth.middleware.js");

const router = express.Router();


// 👉 Usuarios autenticados pueden pagar
router.post("/pagar-tarjeta", auth, onlyUsers, validateSchema(paymentSchema), PaymentController.pagarConTarjeta.bind(PaymentController));
router.post("/pagar-nequi", auth, onlyUsers, validateSchema(paymentSchema), PaymentController.pagarConNequi.bind(PaymentController));

// 👉 Admins o líderes pueden gestionar pagos
router.get("/pagos", auth, onlyAdminsOrLeaders, PaymentController.getPayments.bind(PaymentController));
router.get("/pagos/:id", auth, onlyAdminsOrLeaders, PaymentController.getPaymentById.bind(PaymentController));
router.put("/pagos/:id", auth, onlyAdminsOrLeaders, validateSchema(paymentSchema), PaymentController.updatePayment.bind(PaymentController));
router.delete("/pagos/:id", auth, onlyAdminsOrLeaders, PaymentController.deletePayment.bind(PaymentController));

// ✅ Confirmar el pago (cambiar a "completado")
router.put("/pagos/confirmar/:id", auth,validateSchema(paymentSchema), PaymentController.confirmarPago.bind(PaymentController));

module.exports = router;
