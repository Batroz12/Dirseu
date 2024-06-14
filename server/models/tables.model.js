// Contiene los modelos de la base de datos.

import { pool } from '../utils/db.js';

// Función para buscar un usuario por correo electrónico
export const getTableRequest = async (table) => {

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

export const getTableByIdRequest = async ({ table, id }) => {

    // Asegúrate de que el nombre de la tabla sea seguro
    const validTables = ['talleres', 'capacitaciones', 'ofertas_laborales', 'voluntariados']; // Lista de tablas válidas
    if (!validTables.includes(table)) {
        throw new Error('Invalid table name');
    }

    // Construir dinámicamente la consulta SQL
    const query = `SELECT * FROM ${table} WHERE id = ${id}`;

    const [rows] = await pool.query(query);
    return rows[0];
};

export const getUsersInscriptionRequest = async (table, id) => {
    // Asegúrate de que el nombre de la tabla sea seguro
    const validTables = ['talleres', 'capacitaciones', 'ofertas_laborales', 'voluntariados']; // Lista de tablas válidas

    if (!validTables.includes(table)) {
        throw new Error('Invalid table name');
    }

    const entity_id_column = 'entidad_id'; // Nombre de la columna que almacena el ID de la entidad en las tablas de inscripciones
    // Construir dinámicamente la consulta SQL
    const query = `
        SELECT 
            CONCAT(users.firstName, ' ', users.lastName) AS Nombre,
            estudiantes.codigo AS Codigo,
            estudiantes.carrera AS Carrera,
            estudiantes.semestre AS Semestre,
                inscripciones.fecha_inscripcion AS Fecha_Inscripcion,
            inscripciones.estado AS Estado
        FROM 
            inscripciones_${table} AS inscripciones
        JOIN 
            estudiantes ON inscripciones.estudiante_id = estudiantes.id
        JOIN 
            users ON estudiantes.user_id = users.id
        WHERE 
            inscripciones.${entity_id_column} = ?;`;

    const [rows] = await pool.query(query, [id]);
    return rows;
};


// Función para buscar un usuario por correo electrónico
export const getInscriptionByUserId = async ({ table, entidad_id, estudiante_id }) => {
    try {
        // Asegúrate de que el nombre de la tabla sea seguro
        const validTables = ['talleres', 'capacitaciones', 'ofertas_laborales', 'voluntariados']; // Lista de tablas válidas

        if (!validTables.includes(table)) {
            throw new Error('Invalid table name');
        }

        // Construir dinámicamente la consulta SQL
        const query = `
        SELECT * FROM
            inscripciones_${table}
        WHERE 
            entidad_id = ? AND estudiante_id = ? ;`;

        const [rows] = await pool.query(query, [entidad_id, estudiante_id]);

        return rows[0];
    } catch (error) {
        throw new Error('Fallo al registrar Inscripcion.');
    }
};

export const registerInscriptionRequest = async ({ table, entidad_id, estudiante_id }) => {
    try {
        // Asegúrate de que el nombre de la tabla sea seguro
        const validTables = ['talleres', 'capacitaciones', 'ofertas_laborales', 'voluntariados']; // Lista de tablas válidas

        if (!validTables.includes(table)) {
            throw new Error('Invalid table name');
        }

        // Construir dinámicamente la consulta SQL
        const query = `
        INSERT INTO
            inscripciones_${table} (entidad_id, estudiante_id, fecha_inscripcion, estado)
        VALUES 
        (?, ?, NOW(), 'pendiente');`;

        await pool.query(query, [entidad_id, estudiante_id]);

        // Devuelve una respuesta de éxito
        return { success: true, message: 'Inscripcion Registrada.' };
    } catch (error) {
        throw new Error('Fallo al registrar Inscripcion.');
    }
};
