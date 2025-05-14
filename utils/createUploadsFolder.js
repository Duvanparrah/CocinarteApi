// utils/createUploadsFolder.js

const fs = require('fs');
const path = require('path');

function crearCarpetaUploads() {
  const carpetaUploads = path.join(__dirname, '../uploads');
  const carpetaBanquetes = path.join(carpetaUploads, 'banquetes');

  // Crear la carpeta 'uploads' si no existe
  if (!fs.existsSync(carpetaUploads)) {
    fs.mkdirSync(carpetaUploads);
    console.log('✅ Carpeta "uploads" creada.');
  }

  // Crear subcarpeta 'banquetes' si no existe
  if (!fs.existsSync(carpetaBanquetes)) {
    fs.mkdirSync(carpetaBanquetes, { recursive: true });
    console.log('✅ Carpeta "uploads/banquetes" creada.');
  }
}

module.exports = crearCarpetaUploads;
