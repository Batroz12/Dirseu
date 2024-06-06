import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { getToken, saveToken } from '../models/tokens.model.js';

dotenv.config();

function sign(payload, isAccessToken) {
    return jwt.sign(
        payload,
        isAccessToken
            ? process.env.ACCESS_TOKEN_SECRET
            : process.env.REFRESH_TOKEN_SECRET,
        {
            algorithm: "HS256",
            expiresIn: 3600,
        }
    );
}
// Función para generar el token de acceso
export function generateAccessToken(user) {
    return sign({ user }, true);
}

// Función para generar el token de actualización
export async function generateRefreshToken(user) {
    const refreshToken = sign({ user }, false);
    try {
        const existsToken = await getToken(refreshToken);

        if (!existsToken) {
            await saveToken(refreshToken);
        } else {
            console.log("Token ya registrado");
        }

        return refreshToken;
    } catch (error) {
        console.log(error);
    }

}

