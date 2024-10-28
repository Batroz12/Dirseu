import { getDataByEmail } from '../models/users.model.js';

export const refreshUser = async (req, res) => {
    try {
        res.status(200).json(
            {
                statusCode: 200,
                user: req.user // Sacar req.user que pasa el Authenticate.js (End Point Protejido)
            });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getUserInfo = async (req, res) => {
    try {

        // Sacar req.user que pasa el Authenticate.js (End Point Protegido)
        const { email } = req.user;

        if (!!!email) {
            return res.status(400).json({
                statusCode: 400,
                error: 'Email Requerido'
            });
        }

        const data = await getDataByEmail(email);

        res.status(200).json(
            {
                statusCode: 200,
                data: data,
            });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
