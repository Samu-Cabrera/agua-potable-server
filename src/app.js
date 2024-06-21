import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import usuarioRouter from './routes/usuario.routes.js';
import loginRouter from './routes/login.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

//rutas
app.use('/user', usuarioRouter);
app.use('/api/login', loginRouter);

export const runServer = (port) => {
    app.listen(port, () => {
        console.log(`Server is running on port ${ port }`);
    });
};
