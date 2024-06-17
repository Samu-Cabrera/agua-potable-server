import express from 'express';
import cors from 'cors';
import usuarioRouter from './routes/register.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

//rutas
app.use('/auth', usuarioRouter);

export const runServer = (port) => {
    app.listen(port, () => {
        console.log(`Server is running on port ${ port }`);
    });
};
