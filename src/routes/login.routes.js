import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.middleware.js';
import { login } from '../controllers/login.controller.js';

const loginRouter = Router();

loginRouter.post('/', [
    check('ci', 'El CI es requerido').notEmpty(),
    check('password', 'La contraseña es requerida').notEmpty(),
    validarCampos
] ,login);

export default loginRouter;

