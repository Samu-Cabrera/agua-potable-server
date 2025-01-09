import { Router } from 'express';
import { check } from 'express-validator';
import { createFactura, getFacturaPendiente, getFacturas, getFacturaAll, getFacturaById, updateFactura } from '../controllers/factura.controller.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { validarCampos } from '../middlewares/validar-campos.middleware.js';

const facturaRouter = Router();

facturaRouter.post('/:userID', [
    validarJWT,
    validarCampos
], createFactura);

facturaRouter.get('/:userID', getFacturaPendiente);

facturaRouter.get('/all/:userID', getFacturaAll);

facturaRouter.get('/', getFacturas);

facturaRouter.get('/find/:id', getFacturaById);

facturaRouter.patch('/update/:id', [
    validarJWT,
    validarCampos
], updateFactura);

export default facturaRouter;