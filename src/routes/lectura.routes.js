import { Router } from 'express';
import { check } from 'express-validator';
import { getLecturaAll, lecturaPost, getLecturaActual, updateLimit } from '../controllers/lectura.controller.js';
import { validarCampos } from '../middlewares/validar-campos.middleware.js';
import * as validators  from '../helpers/custom-validator.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const lecturaRouter = Router();

lecturaRouter.get('/all/:userID',[
    check('userID', 'El id del usuairio no es valido').isMongoId(),
    check('userID', '').custom(validators.validarIdUsuario),
    check('userID', '').custom(validators.usuarioActivo),
    validarCampos
] , getLecturaAll);

lecturaRouter.get('/actual/:userID',[
    check('userID', 'El id del usuairio no es valido').isMongoId(),
    check('userID', '').custom(validators.validarIdUsuario),
    check('userID', '').custom(validators.usuarioActivo),
    validarCampos
], getLecturaActual);

lecturaRouter.post('/', [
    validarJWT,
    check('userID', 'El id del usuairio no es valido').isMongoId(),
    check('userID', '').custom(validators.validarIdUsuario),
    check('userID', '').custom(validators.usuarioActivo),
    validarCampos
], lecturaPost);

lecturaRouter.put('/:lecturaId', [
    validarJWT,
    check('lecturaId', 'El id de la lectura no es valida.').isMongoId(),
    check('lecturaId').custom(validators.verificarLecturaId),
    check('limite', 'El limite tiene que ser de tipo numerico').isNumeric(),
    validarCampos
] ,updateLimit)

export default lecturaRouter; 