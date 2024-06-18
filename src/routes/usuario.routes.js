import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.middleware.js';
import * as validador from '../helpers/custom-validator.js';
import usuario from '../controllers/usuario.controller.js';

const usuarioRouter = Router();

usuarioRouter.get('/list', usuario.getUsuario);

usuarioRouter.post('/register', [
    check('nombre', 'El nombre es requerido y de tipo string').notEmpty().isString(),
    check('apellido', 'El apellido es requerido y de tipo string').notEmpty().isString(),
    check('ci', 'El CI es requerido y de tipo numérico').notEmpty().isInt(),
    check('ci', 'El CI debe tener como mínimo 5 y un máximo de 20 caracteres').isLength({min: 5, max: 20}),
    check('ci', 'El ci ya existe').custom(validador.verificarCi),
    check('direccion', 'La dirección es requerido y de tipo string').notEmpty().isString(),
    check('telefono', 'El teléfono es requerido y de tipo numérico').notEmpty().isInt(),
    check('email', 'El email no es valido').notEmpty().isEmail(),
    check('email').custom(validador.verificarEmail),
    check('password', 'El password es requerido y mayor a 6 caracteres').notEmpty().isLength({min: 6}).isString(),
    check('estado', 'El estado debe ser de tipo boolean').isBoolean(),
    check('rol', 'El rol debe ser de tipo string').isString(),
    check('rol', 'El rol no es valido').isIn(['admin_rol', 'user_rol', 'medidor_rol']),
    check('rol').custom(validador.verificarRol),
    check('imagen', 'El imagen debe ser de tip string').isString(),
    validarCampos
], usuario.usuarioPost);

usuarioRouter.put('/upload/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id', 'El usuario no existe').custom(validador.validarIdUsuario),
    validarCampos
], usuario.usuarioPut);

usuarioRouter.delete('/delete/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id', 'El usuario no existe').custom(validador.validarIdUsuario),
    validarCampos
] ,usuario.usuarioDelete);

export default usuarioRouter;
