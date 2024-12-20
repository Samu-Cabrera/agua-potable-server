import { Router } from 'express';
import { obtenerAvisos, getAvisoByUserId, crearAviso, responderAviso, marcarComoLeido } from '../controllers/aviso.controller.js';

const avisoRouter = Router();

avisoRouter.get('/', obtenerAvisos);

avisoRouter.get('/:id', getAvisoByUserId);

avisoRouter.post('/crear', crearAviso);

avisoRouter.post('/:id/responder', responderAviso);

avisoRouter.put('/:avisoId/marcar-leido', marcarComoLeido);

export default avisoRouter;