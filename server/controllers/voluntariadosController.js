import Voluntariado from '../models/voluntariado.js';

export async function crearVoluntariado(req, res) {
  try {
    const { nombre, descripcion, fecha_inicio, fecha_fin, lugar, cupo_maximo } = req.body;

    // Validar que todos los campos estén presentes
    if (!nombre || !descripcion || !fecha_inicio || !fecha_fin || !lugar || !cupo_maximo) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    // Crear el nuevo voluntariado
    const nuevoVoluntariado = await Voluntariado.crear({
      nombre,
      descripcion,
      fecha_inicio,
      fecha_fin,
      lugar,
      cupo_maximo,
    });

    // Respuesta exitosa
    res.status(201).json(nuevoVoluntariado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el voluntariado.' });
  }
}

export async function obtenerVoluntariados(req, res) {
  try {
    const voluntariados = await Voluntariado.obtenerTodos();
    res.json(voluntariados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los voluntariados' });
  }
}

export async function obtenerVoluntariado(req, res) {
  try {
    const voluntariado = await Voluntariado.obtenerPorId(req.params.id);
    if (voluntariado) {
      res.json(voluntariado);
    } else {
      res.status(404).json({ error: 'Voluntariado no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el voluntariado' });
  }
}

export async function actualizarVoluntariado(req, res) {
  try {
    let voluntariado = await Voluntariado.obtenerPorId(req.params.id);
    if (!voluntariado) {
      return res.status(404).json({ error: 'Voluntariado no encontrado' });
    }
    Object.assign(voluntariado, req.body);
    await voluntariado.actualizar();
    res.json(voluntariado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el voluntariado' });
  }
}

export async function eliminarVoluntariado(req, res) {
  try {
    const voluntariado = await Voluntariado.obtenerPorId(req.params.id);
    if (!voluntariado) {
      return res.status(404).json({ error: 'Voluntariado no encontrado' });
    }
    await voluntariado.eliminar();
    res.json({ mensaje: 'Voluntariado eliminado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el voluntariado' });
  }
}