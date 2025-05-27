const Categoria = require("../models/categorias.models");

class CategoriaService {
  async obtenerCategorias() {
    return await Categoria.findAll();
  }

  async obtenerCategoriaPorId(id_categoria) {
    return await Categoria.findByPk(id_categoria);
  }

  async crearCategoria(data) {
    return await Categoria.create(data);
  }

  async actualizarCategoria(id_categoria, data) {
    const categoria = await Categoria.findByPk(id_categoria);
    if (!categoria) return null;
    await categoria.update(data);
    return categoria;
  }

  async eliminarCategoria(id_categoria) {
    const resultado = await Categoria.destroy({ where: { id_categoria } });
    return resultado > 0;
  }
}

module.exports = new CategoriaService();
