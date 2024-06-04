import express from 'express';

import cors from "cors";
import config from './config/config.js';

import indexRoutes from './routes/index.routes.js';
import taskRoutes from './routes/task.routes.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

app.use(indexRoutes);
app.use(taskRoutes);

app.listen(config.PORT);
console.log(`Server is running on port ${config.PORT}.`);