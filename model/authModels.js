// backend/model/authModels.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // tu instancia de sequelize

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  foto: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  googleAccount: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  idioma: {
    type: DataTypes.STRING,
    defaultValue: 'español',
  },
  favoritos: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  notificaciones: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
});

module.exports = { User };
