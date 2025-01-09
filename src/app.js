import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import usuarioRouter from './routes/usuario.routes.js';
import loginRouter from './routes/login.routes.js';
import lecturaRouter from './routes/lectura.routes.js';
import facturaRouter from './routes/factura.routes.js';
import reciboRouter from './routes/recibo.routes.js';
import avisoRouter from './routes/aviso.routes.js';
import transactionRouter from './routes/transaction.routes.js';
import reglamentoRouter from './routes/reglamento.routes.js';
import auditRouter from './routes/audit.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

//rutas
app.use('/user', usuarioRouter);
app.use('/api/login', loginRouter);
app.use('/api/lectura', lecturaRouter);
app.use('/api/user/factura', facturaRouter);
app.use('/api/recibo', reciboRouter);
app.use('/api/aviso', avisoRouter);
app.use('/api/transactions', transactionRouter);
app.use('/api/reglamento', reglamentoRouter);
app.use('/api/audit', auditRouter);


export const runServer = (port) => {
    app.listen(port, () => {
        console.log(`Server is running on port ${ port }`);
    });
};
