const bcrypt = require('bcrypt');
const Admin = require('../models/admin');

const crearAdminPorDefecto = async () => {
  try {
    const adminExistente = await Admin.findOne({ where: { email: 'naviamunozcarloseduardo@gmail.com' } });

    if (!adminExistente) {
      const contraseñaEncriptada = await bcrypt.hash('123456', 10);
      await Admin.create({
        nombre: 'Administrador Principal',
        email: 'naviamunozcarloseduardo@gmail.com',
        password: contraseñaEncriptada // 👈 Aquí se usa 'password' como lo tienes en tu modelo
      });
      console.log('✅ Administrador por defecto creado');
    } else {
      console.log('ℹ️ El administrador ya existe');
    }
  } catch (error) {
    console.error('❌ Error al crear el administrador por defecto:', error);
  }
};

module.exports = crearAdminPorDefecto;
