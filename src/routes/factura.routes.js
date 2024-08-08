import { Router } from 'express';
import { createFactura, getFacturaPendiente } from '../controllers/factura.controller.js';

const facturaRouter = Router();

facturaRouter.post('/:userID', createFactura);

facturaRouter.get('/:userID', getFacturaPendiente)

export default facturaRouter;