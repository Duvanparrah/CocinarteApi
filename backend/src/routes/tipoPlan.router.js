const express = require("express");
const TipoPlanController = require("../controllers/tipoPlan.controller");
const { validateSchema } = require("../middlewares/validator.middleware");
const { tipoPlanSchema } = require("../schemas/tipoPlan.shema");
const AuthMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/crear",AuthMiddleware.auth,AuthMiddleware.onlyAdminsOrLeaders,
  validateSchema(tipoPlanSchema),TipoPlanController.crearTipoPlan);

router.get("/traer",AuthMiddleware.auth, TipoPlanController.obtenerTiposPlanes);

router.put("/actualizar/:id",AuthMiddleware.auth,AuthMiddleware.onlyAdminsOrLeaders,validateSchema(tipoPlanSchema),
  TipoPlanController.actualizarTipoPlan
);

router.delete("/eliminar:id",AuthMiddleware.auth,AuthMiddleware.onlyAdminsOrLeaders,
  TipoPlanController.eliminarTipoPlan
);

module.exports = router;
