// Contiene los modelos de la base de datos.

import { pool } from '../utils/db.js';

// Función para buscar un usuario por correo electrónico
export const getTablenRequest = async (table) => {

    // Asegúrate de que el nombre de la tabla sea seguro
    const validTables = ['talleres', 'capacitaciones', 'ofertas_laborales', 'voluntariados']; // Lista de tablas válidas
    if (!validTables.includes(table)) {
        throw new Error('Invalid table name');
    }

    // Construir dinámicamente la consulta SQL
    const query = `SELECT * FROM ${table}`;

    const [rows] = await pool.query(query);
    return rows;
};

