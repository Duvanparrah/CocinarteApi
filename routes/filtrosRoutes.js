const express = require('express');
const router = express.Router();
const FiltroController = require('../controller/filtroController');

router.get('/filtros/buscar', FiltroController.getFiltroByFilter);

module.exports = router;
