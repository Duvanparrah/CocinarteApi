const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Tu conexión Sequelize
const Ingrediente = require('./ingredientes'); // El modelo de ingrediente

const Receta = sequelize.define('Receta', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preparacion: {
    type: DataTypes.TEXT, // Usamos TEXT para la descripción larga
    allowNull: false
  },
  tiempo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dificultad: {
    type: DataTypes.STRING,
    allowNull: false
  },
  foto: {
    type: DataTypes.STRING // URL o nombre del archivo de imagen
  },
  calorias: {
    type: DataTypes.INTEGER
  },
  proteina: {
    type: DataTypes.INTEGER
  },
  carbohidratos: {
    type: DataTypes.INTEGER
  },
  grasas: {
    type: DataTypes.INTEGER
  },
  azucar: {
    type: DataTypes.INTEGER
  }
});

// Relación muchos a muchos entre Receta e Ingrediente
Receta.belongsToMany(Ingrediente, { through: 'RecetaIngrediente' });
Ingrediente.belongsToMany(Receta, { through: 'RecetaIngrediente' });

module.exports = Receta;
