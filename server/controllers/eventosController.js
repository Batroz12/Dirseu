import Evento from '../models/evento.js';

export async function crearEvento(req, res) {
  try {
    const { nombre, descripcion, fecha_inicio, fecha_fin, lugar, cupo_maximo } = req.body;

    // Validar que todos los campos estén presentes
    if (!nombre || !descripcion || !fecha_inicio || !fecha_fin || !lugar || !cupo_maximo) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    // Crear el nuevo Evento
    const nuevoEvento = await Evento.crear({
      nombre,
      descripcion,
      fecha_inicio,
      fecha_fin,
      lugar,
      cupo_maximo,
    });

    // Respuesta exitosa
    res.status(201).json(nuevoEvento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el Evento.' });
  }
}

export async function obtenerEventos(req, res) {
  try {
    const eventos = await Evento.obtenerTodos();
    res.json(eventos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los Eventos' });
  }
}

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
    res.status(500).json({ error: 'Error al obtener el Evento' });
  }
}

export async function actualizarEvento(req, res) {
  try {
    let evento = await Evento.obtenerPorId(req.params.id);
    if (!evento) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }
    Object.assign(evento, req.body);
    await evento.actualizar();
    res.json(evento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el Evento' });
  }
}

export async function eliminarEvento(req, res) {
  try {
    const evento = await Evento.obtenerPorId(req.params.id);
    if (!evento) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }
    await evento.eliminar();
    res.json({ mensaje: 'Evento eliminado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el Evento' });
  }
}