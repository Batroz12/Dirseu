import { config } from 'dotenv';
config();

const configs = {
    PORT: process.env.PORT || 4000,
    DB_HOST: process.env.DB_HOST || "roundhouse.proxy.rlwy.net",
    DB_USER: process.env.DB_USER || "root",
    DB_PASSWORD: process.env.DB_PASSWORD || "CGOiNQtgXjsQszAxuUcDfBdzjWQtkusQ",
    DB_NAME: process.env.DB_NAME || "railway",
    DB_PORT: process.env.DB_PORT || 14978,
};

export default configs;
