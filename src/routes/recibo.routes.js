import { Router } from 'express';
import { check } from 'express-validator';
import {  crearRecibo, obtenerRecibos, obtenerReciboPorId, getReciboById } from '../controllers/recibo.controller.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { validarCampos } from '../middlewares/validar-campos.middleware.js';

const reciboRouter = Router();

reciboRouter.get('/', obtenerRecibos);

reciboRouter.get('/:userID', obtenerReciboPorId);

reciboRouter.get('/:userID/:id', getReciboById);

reciboRouter.post('/:userID', [
    validarJWT,
    check('userID', 'El id es obligatorio').not().isEmpty(),
    check('userID', 'El id del usuario no es válido').isMongoId(),
    validarCampos
], crearRecibo);

export default reciboRouter;