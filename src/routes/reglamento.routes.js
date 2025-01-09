import { Router } from 'express';
import { check } from 'express-validator';
import { createRule, getRules, getRule, updateRule, deleteRule } from '../controllers/reglamento.controller.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { validarCampos } from '../middlewares/validar-campos.middleware.js';

const reglamentoRouter = Router();

reglamentoRouter.post('/crear',[
    validarJWT,
    validarCampos
] , createRule);
reglamentoRouter.get('/', getRules);
reglamentoRouter.get('/:id', getRule);
reglamentoRouter.put('/:id', [
    validarJWT,
    check('id', 'El id no es valido.').isMongoId(),
    validarCampos
], updateRule);
reglamentoRouter.delete('/:id', [
    validarJWT,
    check('id', 'El id no es valido.').isMongoId(),
    validarCampos
], deleteRule);

export default reglamentoRouter;

