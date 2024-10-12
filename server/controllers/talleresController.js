import Taller from '../models/taller.js';

export async function crearTaller(req, res) {
  try {
    const { nombre, descripcion, fecha_inicio, fecha_fin, lugar, cupo_maximo } = req.body;

    // Validar que todos los campos estén presentes
    if (!nombre || !descripcion || !fecha_inicio || !fecha_fin || !lugar || !cupo_maximo) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    // Crear el nuevo Taller
    const nuevoTaller = await Taller.crear({
      nombre,
      descripcion,
      fecha_inicio,
      fecha_fin,
      lugar,
      cupo_maximo,
    });

    // Respuesta exitosa
    res.status(201).json(nuevoTaller);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el Taller.' });
  }
}

export async function obtenerTalleres(req, res) {
  try {
    const talleres = await Taller.obtenerTodos();
    res.json(talleres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los Taller' });
  }
}

export async function obtenerTaller(req, res) {
  try {
    const taller = await Taller.obtenerPorId(req.params.id);
    if (taller) {
      res.json(taller);
    } else {
      res.status(404).json({ error: 'Taller no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el Taller' });
  }
}

export async function actualizarTaller(req, res) {
  try {
    let taller = await Taller.obtenerPorId(req.params.id);
    if (!taller) {
      return res.status(404).json({ error: 'Taller no encontrado' });
    }
    Object.assign(taller, req.body);
    await taller.actualizar();
    res.json(taller);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el Taller' });
  }
}

export async function eliminarTaller(req, res) {
  try {
    const taller = await Taller.obtenerPorId(req.params.id);
    if (!taller) {
      return res.status(404).json({ error: 'Taller no encontrado' });
    }
    await taller.eliminar();
    res.json({ mensaje: 'Taller eliminado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el Taller' });
  }
}