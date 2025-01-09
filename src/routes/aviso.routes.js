import { Router } from 'express';
import { obtenerAvisos, getAvisoByUserId, crearAviso, responderAviso, marcarComoLeido } from '../controllers/aviso.controller.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { validarCampos } from '../middlewares/validar-campos.middleware.js';

const avisoRouter = Router();

avisoRouter.get('/', obtenerAvisos);

avisoRouter.get('/:id', getAvisoByUserId);

avisoRouter.post('/crear', [
    validarJWT,
    validarCampos
], crearAviso);

avisoRouter.post('/:id/responder', [
    validarJWT,
    validarCampos
], responderAviso);

avisoRouter.put('/:avisoId/marcar-leido', [
    validarJWT,
    validarCampos
], marcarComoLeido);

export default avisoRouter;