import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.middleware.js';
import * as validador from '../helpers/custom-validator.js';
import usuario from '../controllers/usuario.controller.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { validarRol } from '../middlewares/validar-rol.middleware.js';

const usuarioRouter = Router();

usuarioRouter.get('/list', usuario.getUsuario);

usuarioRouter.get('/list-all', usuario.getUsuariosAll);

usuarioRouter.get('/:id', [
    check('id', 'El id no es valido').isMongoId(),
    check('id', 'El usuario no existe').custom(validador.validarIdUsuario),
    check('id').custom(validador.usuarioActivo),
    validarCampos
], usuario.getUserById);

usuarioRouter.get('/list/usuario-deshabilitado', [
    validarJWT,
    validarCampos
] ,usuario.getUsuariosDeshabilitados);

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
    validarCampos
], usuario.usuarioPost);

usuarioRouter.put('/upload/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id', 'El usuario no existe').custom(validador.validarIdUsuario),
    check('id').custom(validador.usuarioActivo),
    validarCampos
], usuario.usuarioPut);

usuarioRouter.delete('/delete/:id', [
    validarJWT,
    validarRol,
    check('id', 'No es un id valido').isMongoId(),
    check('id', 'El usuario no existe').custom(validador.validarIdUsuario),
    check('id').custom(validador.usuarioActivo),
    validarCampos
] ,usuario.usuarioDelete);

export default usuarioRouter;
