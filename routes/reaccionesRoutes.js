const express = require("express");
const router = express.Router();
const ReaccionesController = require("../controller/reaccionController");

router.post("/dar-like", ReaccionesController.darLike);
router.post("/comentar", ReaccionesController.comentar);
router.post("/compartir", ReaccionesController.compartir);

module.exports = router;
