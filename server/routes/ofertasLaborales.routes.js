import express from 'express';
import { crearOfertaLaboral, obtenerOfertasLaborales, obtenerOfertaLaboral, actualizarOfertaLaboral, eliminarOfertaLaboral } from '../controllers/ofertasLaboralesController.js'; // Cambiado a ofertas laborales
import multer from 'multer';
import path from 'path';

// Configuración de almacenamiento con Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads'); // Carpeta donde se almacenarán las imágenes
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, 'IMAGE-' + uniqueSuffix + path.extname(file.originalname));
    }
  });
  
// Función para validar tipos de archivos
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Solo imágenes (jpeg, jpg, png, gif) son permitidas.'));
  }
}

// Inicializar Multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limitar el tamaño a 5MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

const router = express.Router();

// Crear una nueva oferta laboral
router.post('/', upload.single('imagen'), crearOfertaLaboral); // Aplicar Multer aquí

// Obtener todas las ofertas laborales
router.get('/', obtenerOfertasLaborales);

// Obtener una oferta laboral específica
router.get('/:id', obtenerOfertaLaboral);

// Actualizar una oferta laboral
router.put('/:id', upload.single('imagen'), actualizarOfertaLaboral); // Aplicar Multer aquí

// Eliminar una oferta laboral
router.delete('/:id', eliminarOfertaLaboral);

export default router;
