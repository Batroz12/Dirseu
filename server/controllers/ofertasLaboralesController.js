import OfertaLaboral from '../models/ofertaLaboral.js'; // Importa el modelo de la oferta laboral
import fs from 'fs/promises';
import sharp from 'sharp';
import path from 'path';
import os from 'os'; // Para obtener una carpeta temporal

// Crear una nueva oferta laboral con imagen
export async function crearOfertaLaboral(req, res) {
  try {
    const { nombre, descripcion, empresa, fecha_inicio, fecha_fin } = req.body;

    // Validar que todos los campos estén presentes
    if (!nombre || !descripcion || !empresa || !fecha_inicio || !fecha_fin) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const nuevaOfertaData = {
      nombre,
      descripcion,
      empresa,
      fecha_inicio,
      fecha_fin,
      imagen: req.file ? `/uploads/${req.file.filename}` : null
    };

    if (req.file) {
      const tempDir = os.tmpdir(); // Carpeta temporal del sistema
      const tempImagePath = path.join(tempDir, req.file.filename); // Mover imagen temporalmente

      // Mueve la imagen a la carpeta temporal
      await fs.rename(req.file.path, tempImagePath);

      const resizedImagePath = `uploads/resized-${req.file.filename}`; // Redimensionada

      // Procesar y redimensionar imagen
      await sharp(tempImagePath)
        .resize(800)
        .toFormat('webp')
        .jpeg({ quality: 80 })
        .toFile(resizedImagePath);

      // Intentar eliminar la imagen temporal
      try {
        await fs.unlink(tempImagePath);
      } catch (error) {
        console.error(`Error al eliminar la imagen temporal: ${tempImagePath}`, error);
      }

      nuevaOfertaData.imagen = `/uploads/resized-${req.file.filename}`;
    }

    const nuevaOferta = await OfertaLaboral.crear(nuevaOfertaData);

    res.status(201).json(nuevaOferta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la oferta laboral.' });
  }
}

// Obtener todas las ofertas laborales
export async function obtenerOfertasLaborales(req, res) {
  try {
    const ofertasLaborales = await OfertaLaboral.obtenerTodos();
    res.json(ofertasLaborales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las ofertas laborales' });
  }
}

// Obtener una oferta laboral por ID
export async function obtenerOfertaLaboral(req, res) {
  try {
    const ofertaLaboral = await OfertaLaboral.obtenerPorId(req.params.id);
    if (ofertaLaboral) {
      res.json(ofertaLaboral);
    } else {
      res.status(404).json({ error: 'Oferta laboral no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la oferta laboral' });
  }
}

// Actualizar una oferta laboral con posibilidad de cambiar la imagen
export async function actualizarOfertaLaboral(req, res) {
  try {
    const { id } = req.params;
    const { nombre, descripcion, empresa, fecha_inicio, fecha_fin } = req.body;

    // Obtener la oferta laboral existente
    let ofertaLaboral = await OfertaLaboral.obtenerPorId(id);
    if (!ofertaLaboral) {
      return res.status(404).json({ error: 'Oferta laboral no encontrada' });
    }

    // Actualizar los campos
    ofertaLaboral.nombre = nombre || ofertaLaboral.nombre;
    ofertaLaboral.descripcion = descripcion || ofertaLaboral.descripcion;
    ofertaLaboral.empresa = empresa || ofertaLaboral.empresa;
    ofertaLaboral.fecha_inicio = fecha_inicio || ofertaLaboral.fecha_inicio;
    ofertaLaboral.fecha_fin = fecha_fin || ofertaLaboral.fecha_fin;

    // Manejar la imagen si se subió una nueva
    if (req.file) {
      const nuevaImagenRuta = `/uploads/${req.file.filename}`;
      const antiguaImagenRuta = ofertaLaboral.imagen ? path.join('uploads', ofertaLaboral.imagen) : null;

      // Optimizar la nueva imagen
      const resizedImagePath = `uploads/resized-${req.file.filename}`;
      await sharp(req.file.path)
        .resize(800) // Redimensionar a 800px de ancho
        .toFormat('webp')
        .jpeg({ quality: 80 })
        .toFile(resizedImagePath);

      // Eliminar la imagen original
      await fs.unlink(req.file.path);

      // Actualizar la ruta de la imagen en el objeto
      ofertaLaboral.imagen = `/uploads/resized-${req.file.filename}`;

      // Eliminar la imagen antigua si existe
      if (antiguaImagenRuta) {
        try {
          await fs.unlink(antiguaImagenRuta);
          console.log('Imagen antigua eliminada:', antiguaImagenRuta);
        } catch (err) {
          console.error('Error al eliminar la imagen antigua:', err);
        }
      }
    }

    // Actualizar la oferta laboral en la base de datos
    await ofertaLaboral.actualizar();

    // Respuesta exitosa
    res.json(ofertaLaboral);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la oferta laboral' });
  }
}

// Eliminar una oferta laboral y su imagen
export async function eliminarOfertaLaboral(req, res) {
  try {
    const { id } = req.params;

    // Obtener la oferta laboral existente
    const ofertaLaboral = await OfertaLaboral.obtenerPorId(id);
    if (!ofertaLaboral) {
      return res.status(404).json({ error: 'Oferta laboral no encontrada' });
    }

    // Eliminar la imagen si existe
    if (ofertaLaboral.imagen) {
      const rutaImagen = path.join('uploads', ofertaLaboral.imagen);
      try {
        await fs.unlink(rutaImagen);
        console.log('Imagen eliminada:', rutaImagen);
      } catch (err) {
        console.error('Error al eliminar la imagen:', err);
      }
    }

    // Eliminar la oferta laboral de la base de datos
    await ofertaLaboral.eliminar();

    // Respuesta exitosa
    res.json({ mensaje: 'Oferta laboral eliminada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la oferta laboral' });
  }
}
