import express from 'express';

import cors from "cors";
import config from './config/config.js';

import indexRoutes from './routes/index.routes.js';
import sgnin from './routes/login.routes.js';
import signup from './routes/signup.routes.js';
import signout from './routes/signout.routes.js';
import user from './routes/user.routes.js';
import todos from './routes/todos.routes.js';
import refreshToken from './routes/refreshToken.routes.js';
import { authenticate } from './utils/authenticate.js';

import Tables from './routes/Tables.routes.js';


const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());

app.use('/api/login', sgnin);
app.use('/api/signup', signup);
app.use('/api/signout', signout);
app.use('/api/user', authenticate, user);
app.use('/api/todos', authenticate, todos);
app.use('/api/refresh-token', refreshToken);

// TABLES END POINTS
app.use('/api/table', Tables);


app.listen(config.PORT);
console.log(`Server is running on port ${config.PORT}.`); 