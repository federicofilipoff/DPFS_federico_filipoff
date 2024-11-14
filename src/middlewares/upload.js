const multer = require("multer");
const path = require("path");

// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Cambiar la carpeta de destino según el tipo de archivo
    let folder = file.fieldname === "profileImage" ? "users" : "products";
    cb(null, path.join(__dirname, `../../public/images/${folder}`));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Middleware de Multer para subir una imagen
const upload = multer({ storage: storage });

module.exports = upload;
