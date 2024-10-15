import { execute, query } from '../utils/db.js';

class OfertaLaboral {
  constructor(oferta) {
    this.id = oferta.id;
    this.nombre = oferta.nombre;
    this.descripcion = oferta.descripcion;
    this.empresa = oferta.empresa;
    this.fecha_inicio = oferta.fecha_inicio;
    this.fecha_fin = oferta.fecha_fin;
    this.imagen = oferta.imagen;
  }

  static async crear(nuevoOferta) {
    try {
      // Insertar la nueva oferta
      const [result] = await execute(
        'INSERT INTO ofertas_laborales (nombre, descripcion, empresa, fecha_inicio, fecha_fin, imagen) VALUES (?, ?, ?, ?, ?, ?)',
        [
          nuevoOferta.nombre || null,
          nuevoOferta.descripcion || null,
          nuevoOferta.empresa || null,
          nuevoOferta.fecha_inicio || null,
          nuevoOferta.fecha_fin || null,
          nuevoOferta.imagen || null
        ]
      );

      // Obtener la oferta recién insertada
      const [ofertaRows] = await execute('SELECT * FROM ofertas_laborales WHERE id = ?', [result.insertId]);
      
      if (ofertaRows.length === 0) {
        throw new Error('Oferta no encontrada después de la inserción.');
      }

      return new OfertaLaboral(ofertaRows[0]);
    } catch (error) {
      console.error('Error en Oferta.crear:', error);
      throw error;
    }
  }

  static async obtenerTodos() {
    try {
      const ofertas = await query('SELECT * FROM ofertas_laborales');
      console.log('Tipo de ofertas:', typeof ofertas);
      console.log('Contenido de ofertas:', ofertas);
      return ofertas.map(oferta => new OfertaLaboral(oferta));
    } catch (error) {
      console.error('Error en obtenerTodos:', error);
      throw error;
    }
  }

  static async obtenerPorId(id) {
    const [ofertas] = await execute('SELECT * FROM ofertas_laborales WHERE id = ?', [id]);
    if (ofertas.length === 0) return null;
    return new OfertaLaboral(ofertas[0]);
  }

  async actualizar() {
    await execute(
      'UPDATE ofertas_laborales SET nombre = ?, descripcion = ?, empresa = ?, fecha_inicio = ?, fecha_fin = ? WHERE id = ?',
      [this.nombre, this.descripcion, this.empresa, this.fecha_inicio, this.fecha_fin, this.id]
    );
  }

  async eliminar() {
    await execute('DELETE FROM ofertas_laborales WHERE id = ?', [this.id]);
  }
}

export default OfertaLaboral;