import { execute, query } from '../utils/db.js';

class Evento {
  constructor(evento) {
    this.id = evento.id;
    this.nombre = evento.nombre;
    this.descripcion = evento.descripcion;
    this.fecha_inicio = evento.fecha_inicio;
    this.fecha_fin = evento.fecha_fin;
    this.lugar = evento.lugar;
    this.cupo_maximo = evento.cupo_maximo;
  }

  static async crear(nuevoEvento) {
    try {
      // Insertar el nuevo Evento
      const [result] = await execute(
        'INSERT INTO voluntariados (nombre, descripcion, fecha_inicio, fecha_fin, lugar, cupo_maximo) VALUES (?, ?, ?, ?, ?, ?)',
        [
          nuevoEvento.nombre || null,
          nuevoEvento.descripcion || null,
          nuevoEvento.fecha_inicio || null,
          nuevoEvento.fecha_fin || null,
          nuevoEvento.lugar || null,
          nuevoEvento.cupo_maximo || null
        ]
      );

      // Obtener el Evento recién insertado
      const [eventoRows] = await execute('SELECT * FROM eventos WHERE id = ?', [result.insertId]);
      
      if (eventoRows.length === 0) {
        throw new Error('evento no encontrado después de la inserción.');
      }

      return new Evento(eventoRows[0]);
    } catch (error) {
      console.error('Error en evento.crear:', error);
      throw error;
    }
  }

  static async obtenerTodos() {
    try {
      const eventos = await query('SELECT * FROM eventos');
      console.log('Tipo de eventos:', typeof eventos);
      console.log('Contenido de eventos:', eventos);
      return eventos.map(evento => new Evento(evento));
    } catch (error) {
      console.error('Error en obtenerTodos:', error);
      throw error;
    }
  }

  static async obtenerPorId(id) {
    const [eventos] = await execute('SELECT * FROM eventos WHERE id = ?', [id]);
    if (eventos.length === 0) return null;
    return new Evento(eventos[0]);
  }

  async actualizar() {
    await execute(
      'UPDATE eventos SET nombre = ?, descripcion = ?, fecha_inicio = ?, fecha_fin = ?, lugar = ?, cupo_maximo = ? WHERE id = ?',
      [this.nombre, this.descripcion, this.fecha_inicio, this.fecha_fin, this.lugar, this.cupo_maximo, this.id]
    );
  }

  async eliminar() {
    await execute('DELETE FROM eventos WHERE id = ?', [this.id]);
  }
}

export default Evento;