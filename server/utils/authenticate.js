import { getTokenHeader } from "./getTokenHeader.js";
import { verifyAccessToken } from "./verifyToken.js";

export function authenticate(req, res, next) {
    const token = getTokenHeader(req.headers);


    if (!token) {
        return res.status(401).json(
            {
                statusCode: 401,
                error: 'No Token Provided'

            });
    }

    const decoded = verifyAccessToken(token);
    if (!decoded) {
        return res.status(401).json(
            {
                statusCode: 401,
                error: 'No Token Provided'

            });
    }

    req.user = { ...decoded.user };
    next();
}