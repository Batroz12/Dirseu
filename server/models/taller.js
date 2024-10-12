import { execute, query } from '../utils/db.js';

class Taller {
  constructor(taller) {
    this.id = taller.id;
    this.nombre = taller.nombre;
    this.descripcion = taller.descripcion;
    this.fecha_inicio = taller.fecha_inicio;
    this.fecha_fin = taller.fecha_fin;
    this.lugar = taller.lugar;
    this.cupo_maximo = taller.cupo_maximo;
  }

  static async crear(nuevoTaller) {
    try {
      // Insertar el nuevo Taller
      const [result] = await execute(
        'INSERT INTO talleres (nombre, descripcion, fecha_inicio, fecha_fin, lugar, cupo_maximo) VALUES (?, ?, ?, ?, ?, ?)',
        [
          nuevoTaller.nombre || null,
          nuevoTaller.descripcion || null,
          nuevoTaller.fecha_inicio || null,
          nuevoTaller.fecha_fin || null,
          nuevoTaller.lugar || null,
          nuevoTaller.cupo_maximo || null
        ]
      );
      
      console.log('Resultado del INSERT:', result);

      // Obtener el taller recién insertado
      const [tallerRows] = await execute('SELECT * FROM talleres WHERE id = ?', [result.insertId]);
      
      if (tallerRows.length === 0) {
        throw new Error('Taller no encontrado después de la inserción.');
      }

      return new Taller(tallerRows[0]);
    } catch (error) {
      console.error('Error en Taller.crear:', error);
      throw error;
    }
  }

  static async obtenerTodos() {
    try {
      const talleres = await query('SELECT * FROM talleres');
      console.log('Tipo de talleres:', typeof talleres);
      console.log('Contenido de talleres:', talleres);
      return talleres.map(taller => new Taller(taller));
    } catch (error) {
      console.error('Error en obtenerTodos:', error);
      throw error;
    }
  }

  static async obtenerPorId(id) {
    const [talleres] = await execute('SELECT * FROM talleres WHERE id = ?', [id]);
    if (talleres.length === 0) return null;
    return new Taller(talleres[0]);
  }

  async actualizar() {
    await execute(
      'UPDATE talleres SET nombre = ?, descripcion = ?, fecha_inicio = ?, fecha_fin = ?, lugar = ?, cupo_maximo = ? WHERE id = ?',
      [this.nombre, this.descripcion, this.fecha_inicio, this.fecha_fin, this.lugar, this.cupo_maximo, this.id]
    );
  }

  async eliminar() {
    await execute('DELETE FROM talleres WHERE id = ?', [this.id]);
  }
}

export default Taller;