import OfertaLaboral from '../models/ofertaLaboral.js';

export async function crearOfertaLaboral(req, res) {
  try {
    const { nombre, descripcion, empresa, fecha_inicio, fecha_fin } = req.body;

    //Validar que todos los campos este presentes
    if (!nombre || !descripcion || !empresa || !fecha_inicio || !fecha_fin) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios'});
    }

    //Crear la nuevo oferta
    const nuevoOferta = await OfertaLaboral.crear({
      nombre,
      descripcion,
      empresa,
      fecha_inicio,
      fecha_fin
    });

    //Respuesta exitosa
    res.status(201).json(nuevoOferta);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear la Oferta'});
    }
}

export async function obtenerOfertasLaborales(req, res) {
  try {
    const ofertas = await OfertaLaboral.obtenerTodos();
    res.json(ofertas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las ofertas laborales' });
  }
}

export async function obtenerOfertaLaboral(req, res) {
  try {
    const oferta = await OfertaLaboral.obtenerPorId(req.params.id);
    if (oferta) {
      res.json(oferta);
    } else {
      res.status(404).json({ error: 'Oferta laboral no encontrada'});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: ' Error al obtener Oferta Laboral' });
  }
}

export async function actualizarOfertaLaboral(req, res) {
  try {
    let oferta = await OfertaLaboral.obtenerPorId(req.params.id);
    if (!oferta) {
      return res.status(404).json({ error: 'Oferta laboral no encontrada' });
    }
    Object.assign(oferta, req.body);
    await oferta.actualizar();
    res.json(oferta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la oferta laboral' });
  }
}

export async function eliminarOfertaLaboral(req, res) {
  try {
    const oferta = await OfertaLaboral.obtenerPorId(req.params.id);
    if (!oferta) {
      return res.status(404).json({ error: 'Oferta laboral no encontrada' });
    }
    await oferta.eliminar();
    res.json({ mensaje: 'Oferta laboral eliminada con exito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la oferta laboral' })
  }
}