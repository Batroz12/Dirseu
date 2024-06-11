import { getTableRequest, getTableByIdRequest, getUsersInscriptionRequest, getInscriptionByUserId, registerInscriptionRequest } from "../models/tables.model.js";

export const getTables = async (req, res) => {
    try {

        const { table } = req.body;

        if (!!!table) {
            return res.status(400).json({
                statusCode: 400,
                error: 'Campos Requeridos'
            });
        }

        const rows = await getTableRequest(table);

        res.status(200).json(
            {
                statusCode: 200,
                rows: rows
            });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            error: error.message,
        });
    }
}

export const getModule = async (req, res) => {
    try {

        const { table, id } = req.body;

        if (!!!table || !!!id) {
            return res.status(400).json({
                statusCode: 400,
                error: 'Campos Requeridos'
            });
        }

        const data = await getTableByIdRequest({ table, id });


        if (!data) {
            return {
                statusCode: 400,
                error: 'No Existe Modulo'

            };
        }

        // console.log(data);
        res.status(200).json(
            {
                statusCode: 200,
                data: data
            });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            error: error.message,
        });
    }
}

export const getUsersByInscription = async (req, res) => {
    try {

        const { table, id } = req.body;

        if (!!!table || !!!id) {
            return res.status(400).json({
                statusCode: 400,
                error: 'Campos Requeridos'
            });
        }

        const rows = await getUsersInscriptionRequest(table, id);

        res.status(200).json(
            {
                statusCode: 200,
                rows: rows
            });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            error: error.message,
        });
    }
}

export const registerIncription = async (req, res) => {
    try {

        const { table, entidad_id, estudiante_id } = req.body;

        if (!!!table || !!!entidad_id || !!!estudiante_id) {
            return res.status(400).json({
                statusCode: 400,
                error: 'Campos Requeridos'
            });
        }

        const exists = await getInscriptionByUserId({ table, estudiante_id });

        if (exists) {
            return res.status(400).json({
                statusCode: 400,
                error: 'Ya se realizo una Inscripcion Previa'
            });
        }

        await registerInscriptionRequest({ table, entidad_id, estudiante_id });

        res.status(200).json({
            statusCode: 200,
            message: 'Se Registro Inscripcion Exitosamente',
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            error: error.message,
        });
    }
}
