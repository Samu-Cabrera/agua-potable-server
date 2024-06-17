import { Router } from 'express';
import usuario from '../controllers/usuario.controller.js';

const usuarioRouter = Router();

usuarioRouter.get('/register', usuario.getUsuario);

usuarioRouter.post('/register', usuario.usuarioPost);

usuarioRouter.put('/register/:id', usuario.usuarioPut);

usuarioRouter.delete('/register/:id', usuario.usuarioDelete);

export default usuarioRouter;
