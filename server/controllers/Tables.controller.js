import { getTablenRequest } from "../models/tables.model.js";

export const getTable = async (req, res) => {
    try {

        const { table } = req.body;

        const rows = await getTablenRequest(table);

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
