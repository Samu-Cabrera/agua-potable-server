import { Router } from 'express';
import { createFactura, getFacturaPendiente, getFacturas, getFacturaAll, getFacturaById, updateFactura } from '../controllers/factura.controller.js';

const facturaRouter = Router();

facturaRouter.post('/:userID', createFactura);

facturaRouter.get('/:userID', getFacturaPendiente);

facturaRouter.get('/all/:userID', getFacturaAll);

facturaRouter.get('/', getFacturas);

facturaRouter.get('/find/:id', getFacturaById);

facturaRouter.patch('/update/:id', updateFactura);

export default facturaRouter;