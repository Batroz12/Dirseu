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

