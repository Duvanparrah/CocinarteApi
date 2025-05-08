const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("cocinarte_db", "root", "123456789", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // Puedes poner true si quieres ver las consultas en consola
});

module.exports = sequelize;
