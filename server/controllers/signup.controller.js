// Contiene la lógica de controladores para manejar las solicitudes HTTP.

import { getUserByEmail, registerUser, registerStudent, registerEgresado, registerDocente } from '../models/users.model.js';

async function createUser(userData) {
    try {
        const { firstName, lastName, email, password } = userData;


        if (!!!firstName || !!!lastName || !!!email || !!!password) {
            return res.status(400).json(
                {
                    statusCode: 400,
                    error: 'Campos Requeridos'

                });
        }

        // Crear Usuario
        const exists = await getUserByEmail(email);


        if (exists) {
            return {
                statusCode: 400,
                error: 'El Usuario Ya Existe'

            };
        }

        await registerUser({ firstName, lastName, email, password });


        return {
            statusCode: 200,
            message: 'Usuario Creado Exitosamente',
            id: user.id,
        };

    } catch (error) {
        return { statusCode: 500, message: error.message };
    }
}

export const createStudent = async (req, res) => {
    try {

        const { codigo, matricula, carrera, semestre, fecha_nacimiento, telefono, direccion } = req.body;

        if (!!!codigo || !!!matricula || !!!carrera || !!!semestre || !!!fecha_nacimiento) {
            return res.status(400).json({
                statusCode: 400,
                error: 'Campos Requeridos'
            });
        }

        // Crear Usuario 
        const user = await createUser(req.body);

        // Verficar Error de creacion de usuario
        if (user.error) {
            return res.status(400).json(user);
        }

        const exists = await getUserByEmail(req.body.email);

        // Verificar si el usuario se creo
        if (!exists) {
            return res.status(400).json({
                statusCode: 400,
                error: 'El Usuario No pudo crearse'
            });
        }


        // Llama a la función para registrar al estudiante
        await registerStudent({ codigo, matricula, carrera, semestre, fecha_nacimiento, telefono, direccion, user_id: exists.id });

        res.status(200).json({
            statusCode: 200,
            message: 'Estudiante creado exitosamente',
        });
    } catch (error) {
        return res.status(500).json({ statusCode: 500, message: error.message });
    }
};

export const createEgresado = async (req, res) => {
    try {

        const { codigo, carrera, promocion, telefono, direccion } = req.body;

        if (!!!codigo || !!!carrera || !!!promocion) {
            return res.status(400).json({
                statusCode: 400,
                error: 'Campos Requeridos'
            });
        }

        // Crear Usuario 
        const user = await createUser(req.body);

        // Verficar Error de creacion de usuario
        if (user.error) {
            return res.status(400).json(user);
        }

        const exists = await getUserByEmail(req.body.email);

        // Verificar si el usuario se creo
        if (!exists) {
            return res.status(400).json({
                statusCode: 400,
                error: 'El Usuario No pudo crearse'
            });
        }


        // Llama a la función para registrar al estudiante
        await registerEgresado({ codigo, carrera, promocion, telefono, direccion, user_id: exists.id });

        res.status(200).json({
            statusCode: 200,
            message: 'Egresado creado exitosamente',
        });
    } catch (error) {
        return res.status(500).json({ statusCode: 500, message: error.message });
    }
};


export const createDocente = async (req, res) => {
    try {
        const { codigo_docente, departamento, telefono, direccion } = req.body;

        if (!!!codigo_docente || !!!departamento) {
            return res.status(400).json({
                statusCode: 400,
                error: 'Campos Requeridos'
            });
        }

        // Crear Usuario 
        const user = await createUser(req.body);

        // Verficar Error de creacion de usuario
        if (user.error) {
            return res.status(400).json(user);
        }

        const exists = await getUserByEmail(req.body.email);

        // Verificar si el usuario se creo
        if (!exists) {
            return res.status(400).json({
                statusCode: 400,
                error: 'El Usuario No pudo crearse'
            });
        }

        await registerDocente({ codigo_docente, departamento, telefono, direccion, user_id: exists.id });

        res.status(200).json({
            statusCode: 200,
            message: 'Docente creado exitosamente.',
        });
    } catch (error) {
        return res.status(500).json({ statusCode: 500, message: error.message });
    }
};


