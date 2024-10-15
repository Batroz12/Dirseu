import Capacitacion from '../models/capacitacion.js';
import fs from 'fs/promises';
import sharp from 'sharp';
import path from 'path';
import os from 'os'; // Para obtener una carpeta temporal

// Crear una nueva capacitación con imagen
export async function crearCapacitacion(req, res) {
  try {
    const { nombre, descripcion, fecha_inicio, fecha_fin, lugar, cupo_maximo } = req.body;

    // Validar que todos los campos estén presentes
    if (!nombre || !descripcion || !fecha_inicio || !fecha_fin || !lugar || !cupo_maximo) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const nuevaCapacitacionData = {
      nombre,
      descripcion,
      fecha_inicio,
      fecha_fin,
      lugar,
      cupo_maximo,
      imagen: req.file ? `/uploads/${req.file.filename}` : null
    };

    if (req.file) {
      const tempDir = os.tmpdir(); // Carpeta temporal del sistema
      const tempImagePath = path.join(tempDir, req.file.filename); // Mover imagen temporalmente

      // Mueve la imagen a la carpeta temporal
      await fs.rename(req.file.path, tempImagePath);

      const resizedImagePath = `uploads/resized-${req.file.filename}`; // Ruta de la imagen redimensionada

      // Procesar y redimensionar imagen con sharp
      await sharp(tempImagePath)
        .resize(800) // Redimensionar a 800px de ancho
        .toFormat('webp')
        .jpeg({ quality: 80 })
        .toFile(resizedImagePath);

      // Intentar eliminar la imagen temporal
      try {
        await fs.unlink(tempImagePath);
      } catch (error) {
        console.error(`Error al eliminar la imagen temporal: ${tempImagePath}`, error);
      }

      nuevaCapacitacionData.imagen = `/uploads/resized-${req.file.filename}`;
    }

    const nuevaCapacitacion = await Capacitacion.crear(nuevaCapacitacionData);

    res.status(201).json(nuevaCapacitacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la capacitación.' });
  }
}

// Obtener todas las capacitaciones
export async function obtenerCapacitaciones(req, res) {
  try {
    const capacitaciones = await Capacitacion.obtenerTodos();
    res.json(capacitaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las capacitaciones' });
  }
}

// Obtener una capacitación por ID
export async function obtenerCapacitacion(req, res) {
  try {
    const capacitacion = await Capacitacion.obtenerPorId(req.params.id);
    if (capacitacion) {
      res.json(capacitacion);
    } else {
      res.status(404).json({ error: 'Capacitación no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la capacitación' });
  }
}

// Actualizar una capacitación con posibilidad de cambiar la imagen
export async function actualizarCapacitacion(req, res) {
  try {
    const { id } = req.params;
    const { nombre, descripcion, fecha_inicio, fecha_fin, lugar, cupo_maximo } = req.body;

    // Obtener la capacitación existente
    let capacitacion = await Capacitacion.obtenerPorId(id);
    if (!capacitacion) {
      return res.status(404).json({ error: 'Capacitación no encontrada' });
    }

    // Actualizar los campos
    capacitacion.nombre = nombre || capacitacion.nombre;
    capacitacion.descripcion = descripcion || capacitacion.descripcion;
    capacitacion.fecha_inicio = fecha_inicio || capacitacion.fecha_inicio;
    capacitacion.fecha_fin = fecha_fin || capacitacion.fecha_fin;
    capacitacion.lugar = lugar || capacitacion.lugar;
    capacitacion.cupo_maximo = cupo_maximo || capacitacion.cupo_maximo;

    // Manejar la imagen si se subió una nueva
    if (req.file) {
      const nuevaImagenRuta = `/uploads/resized-${req.file.filename}`;
      const antiguaImagenRuta = capacitacion.imagen ? path.join('uploads', capacitacion.imagen) : null;

      // Procesar y redimensionar la nueva imagen con sharp
      const tempDir = os.tmpdir(); // Carpeta temporal del sistema
      const tempImagePath = path.join(tempDir, req.file.filename); // Mover imagen temporalmente

      await fs.rename(req.file.path, tempImagePath);

      const resizedImagePath = `uploads/resized-${req.file.filename}`; // Ruta de la imagen redimensionada

      await sharp(tempImagePath)
        .resize(800) // Redimensionar a 800px de ancho (ajusta según tus necesidades)
        .toFormat('webp')
        .jpeg({ quality: 80 })
        .toFile(resizedImagePath);

      // Intentar eliminar la imagen temporal
      try {
        await fs.unlink(tempImagePath);
      } catch (error) {
        console.error(`Error al eliminar la imagen temporal: ${tempImagePath}`, error);
      }

      // Actualizar la ruta de la imagen en el objeto
      capacitacion.imagen = nuevaImagenRuta;

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

    // Actualizar la capacitación en la base de datos
    await capacitacion.actualizar();

    // Respuesta exitosa
    res.json(capacitacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la capacitación' });
  }
}

// Eliminar una capacitación y su imagen
export async function eliminarCapacitacion(req, res) {
  try {
    const { id } = req.params;

    // Obtener la capacitación existente
    const capacitacion = await Capacitacion.obtenerPorId(id);
    if (!capacitacion) {
      return res.status(404).json({ error: 'Capacitación no encontrada' });
    }

    // Eliminar la imagen si existe
    if (capacitacion.imagen) {
      const rutaImagen = path.join('uploads', capacitacion.imagen);
      try {
        await fs.unlink(rutaImagen);
        console.log('Imagen eliminada:', rutaImagen);
      } catch (err) {
        console.error('Error al eliminar la imagen:', err);
      }
    }

    // Eliminar la capacitación de la base de datos
    await capacitacion.eliminar();

    // Respuesta exitosa
    res.json({ mensaje: 'Capacitación eliminada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la capacitación' });
  }
}
