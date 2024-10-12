import Capacitacion from '../models/capacitacion.js';

export async function crearCapacitacion(req, res) {
  try {
    const { nombre, descripcion, fecha_inicio, fecha_fin, lugar, cupo_maximo } = req.body;

    // Validar que todos los campos estén presentes
    if (!nombre || !descripcion || !fecha_inicio || !fecha_fin || !lugar || !cupo_maximo) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    // Crear el nuevo voluntariado
    const nuevoCapacitacion = await Capacitacion.crear({
      nombre,
      descripcion,
      fecha_inicio,
      fecha_fin,
      lugar,
      cupo_maximo,
    });

    // Respuesta exitosa
    res.status(201).json(nuevoCapacitacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la Capacitacion.' });
  }
}

export async function obtenerCapacitaciones(req, res) {
  try {
    const capacitacion = await Capacitacion.obtenerTodos();
    res.json(capacitacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las capacitaciones' });
  }
}

export async function obtenerCapacitacion(req, res) {
  try {
    const capacitacion = await Capacitacion.obtenerPorId(req.params.id);
    if (capacitacion) {
      res.json(capacitacion);
    } else {
      res.status(404).json({ error: 'Capacitacion no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la Capacitacion' });
  }
}

export async function actualizarCapacitacion(req, res) {
  try {
    let capacitacion = await Capacitacion.obtenerPorId(req.params.id);
    if (!capacitacion) {
      return res.status(404).json({ error: 'Capacitacion no encontrada' });
    }
    Object.assign(capacitacion, req.body);
    await capacitacion.actualizar();
    res.json(capacitacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la Capacitacion' });
  }
}

export async function eliminarCapacitacion(req, res) {
  try {
    const capacitacion = await Capacitacion.obtenerPorId(req.params.id);
    if (!capacitacion) {
      return res.status(404).json({ error: 'Capacitacion no encontrada' });
    }
    await capacitacion.eliminar();
    res.json({ mensaje: 'Capacitacion eliminado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la Capacitacion' });
  }
}