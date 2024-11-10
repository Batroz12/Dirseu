import Evento from '../models/evento.js'; 
import fs from 'fs/promises';
import sharp from 'sharp';
import path from 'path';
import os from 'os'; 

// Crear un nuevo evento con imagen
export async function crearEvento(req, res) {
  try {
    const { nombre, descripcion, fecha, hora, lugar } = req.body;

    // Validar que todos los campos estén presentes
    if (!nombre || !descripcion || !fecha || !hora || !lugar) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const nuevoEventoData = {
      nombre,
      descripcion,
      fecha,
      hora,
      lugar,
      imagen: req.file ? `/uploads/${req.file.filename}` : null,
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
        .toFormat('webp') // Cambiado a webp
        .webp({ quality: 80 }) // Cambiado a webp
        .toFile(resizedImagePath);

      // Intentar eliminar la imagen temporal
      try {
        await fs.unlink(tempImagePath);
      } catch (error) {
        console.error(`Error al eliminar la imagen temporal: ${tempImagePath}`, error);
      }

      nuevoEventoData.imagen = `/uploads/resized-${req.file.filename}`;
    }

    const nuevoEvento = await Evento.crear(nuevoEventoData);

    res.status(201).json(nuevoEvento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el evento.' });
  }
}

// Obtener todos los eventos
export async function obtenerEventos(req, res) {
  try {
    const eventos = await Evento.obtenerTodos();
    res.json(eventos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los eventos' });
  }
}

// Obtener un evento por ID
export async function obtenerEvento(req, res) {
  try {
    const evento = await Evento.obtenerPorId(req.params.id);
    if (evento) {
      res.json(evento);
    } else {
      res.status(404).json({ error: 'Evento no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el evento' });
  }
}

// Actualizar un evento con posibilidad de cambiar la imagen
export async function actualizarEvento(req, res) {
  try {
    const { id } = req.params;
    const { nombre, descripcion, fecha, hora, lugar } = req.body;

    // Obtener el evento existente
    let evento = await Evento.obtenerPorId(id);
    if (!evento) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }

    // Actualizar los campos
    evento.nombre = nombre || evento.nombre;
    evento.descripcion = descripcion || evento.descripcion;
    evento.fecha = fecha || evento.fecha;
    evento.hora = hora || evento.hora;
    evento.lugar = lugar || evento.lugar;

    // Manejar la imagen si se subió una nueva
    if (req.file) {
      const nuevaImagenRuta = `/uploads/${req.file.filename}`;
      const antiguaImagenRuta = evento.imagen ? path.join('uploads', path.basename(evento.imagen)) : null;

      // Optimizar la nueva imagen
      const resizedImagePath = `uploads/resized-${req.file.filename}`;
      await sharp(req.file.path)
        .resize(800) // Redimensionar a 800px de ancho
        .toFormat('webp') // Cambiado a webp
        .webp({ quality: 80 }) // Cambiado a webp
        .toFile(resizedImagePath);

      // Eliminar la imagen original
      await fs.unlink(req.file.path);

      // Actualizar la ruta de la imagen en el objeto
      evento.Imagen = `/uploads/resized-${req.file.filename}`;

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

    // Actualizar el evento en la base de datos
    await evento.actualizar();

    // Respuesta exitosa
    res.json(evento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el evento' });
  }
}

// Eliminar un evento y su imagen
export async function eliminarEvento(req, res) {
  try {
    const { id } = req.params;

    // Obtener el evento existente
    const evento = await Evento.obtenerPorId(id);
    if (!evento) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }

    // Eliminar la imagen si existe
    if (evento.imagen) {
      const rutaImagen = path.join('uploads', path.basename(evento.imagen));
      try {
        await fs.unlink(rutaImagen);
        console.log('Imagen eliminada:', rutaImagen);
      } catch (err) {
        console.error('Error al eliminar la imagen:', err);
      }
    }

    // Eliminar el evento de la base de datos
    await evento.eliminar();

    // Respuesta exitosa
    res.json({ mensaje: 'Evento eliminado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el evento' });
  }
}
