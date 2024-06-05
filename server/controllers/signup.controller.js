// Contiene la lógica de controladores para manejar las solicitudes HTTP.

import { getUserByEmail, registerUser } from '../models/users.model.js';

export const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        console.log(req.body);

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
            return res.status(400).json(
                {
                    statusCode: 400,
                    error: 'El Usuario Ya Existe'

                });
        }

        await registerUser({ firstName, lastName, email, password });

        res.status(200).json(
            {
                statusCode: 200,
                message: 'Usuario Creado Exitosamente'
            });

    } catch (error) {
        return res.status(500).json({ statusCode: 500, message: error.message });
    }
}
