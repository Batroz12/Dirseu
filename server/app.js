import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import path from 'path';

import configs from './config/config.js';
import indexRoutes from './routes/index.routes.js';
import sgnin from './routes/login.routes.js';
import signup from './routes/signup.routes.js';
import signout from './routes/signout.routes.js';
import user from './routes/user.routes.js';
import todos from './routes/todos.routes.js';
import refreshToken from './routes/refreshToken.routes.js';
import { authenticate } from './utils/authenticate.js';

import voluntariadosRoutes from './routes/voluntariados.routes.js';
import capacitacionesRoutes from './routes/capacitaciones.routes.js';
import eventosRoutes from './routes/eventos.routes.js';
import ofertasLaboralesRoutes from './routes/ofertasLaborales.routes.js';
import talleresRoutes from './routes/talleres.routes.js';
import Tables from './routes/Tables.routes.js';


const app = express();

app.use(cors());

app.use(express.json());

// Servir archivos estáticos (como imágenes) desde la carpeta "uploads"
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Rutas
app.use('/api/login', sgnin);
app.use('/api/signup', signup);
app.use('/api/signout', signout);
app.use('/api/user', authenticate, user);
app.use('/api/todos', authenticate, todos);
app.use('/api/refresh-token', refreshToken);

app.use('/api/capacitaciones', capacitacionesRoutes);
app.use('/api/eventos', eventosRoutes);
app.use('/api/ofertas', ofertasLaboralesRoutes);
app.use('/api/talleres', talleresRoutes);
app.use('/api/voluntariados', voluntariadosRoutes);

// TABLES END POINTS
app.use('/api/table', Tables);


app.listen(configs.PORT);
console.log(`Server is running on port ${configs.PORT}.`); 