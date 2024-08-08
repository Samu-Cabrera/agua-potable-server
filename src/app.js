import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import usuarioRouter from './routes/usuario.routes.js';
import loginRouter from './routes/login.routes.js';
import lecturaRouter from './routes/lectura.routes.js';
import facturaRouter from './routes/factura.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

//rutas
app.use('/user', usuarioRouter);
app.use('/api/login', loginRouter);
app.use('/api/lectura', lecturaRouter);
app.use('/api/user/factura', facturaRouter);

export const runServer = (port) => {
    app.listen(port, () => {
        console.log(`Server is running on port ${ port }`);
    });
};
