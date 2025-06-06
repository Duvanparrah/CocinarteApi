const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento con multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    // Definimos un nombre único para el archivo
    cb(null, Date.now() + path.extname(file.originalname)); // Usamos la fecha actual como nombre
  }
});

// Verificación del tipo de archivo
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Archivos solo en formato JPEG, JPG, PNG, o GIF.');
  }
};

// Configuración de Multer con el almacenamiento y filtro de archivos
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Límite de tamaño: 5MB
});

module.exports = upload;
