import { Router } from 'express';
import {  crearRecibo, obtenerRecibos, obtenerReciboPorId, getReciboById } from '../controllers/recibo.controller.js';

const reciboRouter = Router();

reciboRouter.get('/', obtenerRecibos);

reciboRouter.get('/:userID', obtenerReciboPorId);

reciboRouter.get('/:userID/:id', getReciboById);

reciboRouter.post('/:userID', crearRecibo);

export default reciboRouter;