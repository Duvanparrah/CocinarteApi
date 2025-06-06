// routes/inicioRoutes.js
const express = require('express');
const RecetaController = require('../controller/inicioController');
const errorHandler = require('../middleware/errorHandler');

class RecetaRoutes {
  constructor() {
    this.router = express.Router();
    this.configurarRutas();
  }

  configurarRutas() {
    // Obtener todas las recetas
    this.router.get('/', RecetaController.obtenerTodasLasRecetas);

    // Editar receta
    this.router.put('/:id', RecetaController.editarReceta);

    // Publicar/ocultar receta
    this.router.put('/publicar/:id', RecetaController.publicarReceta);

    // Middleware de manejo de errores
    this.router.use(errorHandler);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new RecetaRoutes().getRouter();

