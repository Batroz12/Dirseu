// Contiene los modelos de la base de datos.

import bcrypt from 'bcrypt';
import { pool } from '../utils/db.js';

// Función para registrar un nuevo usuario
export const registerUser = async ({ firstName, lastName, email, password }) => {
    try {

        const hashedPassword = await bcrypt.hash(password, 10);


        await pool.query('INSERT INTO users (firstName, lastName, email, password, role) VALUES (?, ?, ?, ?, ?)', [firstName, lastName, email, hashedPassword, 'student']);

        // Devuelve una respuesta de éxito
        return { success: true, message: 'User registered successfully.' };
    } catch (error) {
        throw new Error('Failed to register user.');
    }
};

// Función para buscar un usuario por correo electrónico
export const getUserByEmail = async (email) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

// Función para comparar la contraseña proporcionada con la almacenada en la base de datos
export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};


export const getDataByEmail = async (email) => {
    try {

        // Probar si es estudiante
        let [rows] = await pool.query('SELECT * FROM users u INNER JOIN estudiantes e ON e.user_id = u.id WHERE u.email = ?', [email]);
        if (rows[0]) {
            return { type: 'estudiante', ...rows[0] };
        }

        // Probar si es docente
        [rows] = await pool.query('SELECT * FROM users u INNER JOIN docentes d ON d.user_id = u.id WHERE u.email = ?', [email]);

        if (rows[0]) {
            return { type: 'estudiante', ...rows[0] };
        }

    } catch (error) {
        throw new Error('Failed to obtain info user.');
    }
}



export const registerStudent = async ({ codigo, matricula, carrera, semestre, fecha_nacimiento, telefono, direccion, user_id }) => {
    try {
        // Insertar datos en la tabla de estudiantes
        await pool.query('INSERT INTO estudiantes (codigo, matricula, carrera, semestre, fecha_nacimiento, telefono, direccion, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [codigo, matricula, carrera, semestre, fecha_nacimiento, telefono, direccion, user_id]);

        // Devuelve una respuesta de éxito
        return { success: true, message: 'Student registered successfully.' };
    } catch (error) {
        throw new Error('Failed to register student.');
    }
};

export const registerDocente = async ({ codigo_docente, departamento, telefono, direccion, user_id }) => {
    try {
        await pool.query('INSERT INTO docentes (codigo_docente, departamento, telefono, direccion, user_id) VALUES (?, ?, ?, ?, ?)', [codigo_docente, departamento, telefono, direccion, user_id]);
        return { success: true, message: 'Docente registrado exitosamente.' };
    } catch (error) {
        throw new Error('Error al registrar el docente.');
    }
};

