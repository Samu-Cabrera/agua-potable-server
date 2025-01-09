import { Router } from 'express';
import { createRule, getRules, getRule, updateRule, deleteRule } from '../controllers/reglamento.controller.js';

const reglamentoRouter = Router();

reglamentoRouter.post('/crear', createRule);
reglamentoRouter.get('/', getRules);
reglamentoRouter.get('/:id', getRule);
reglamentoRouter.put('/:id', updateRule);
reglamentoRouter.delete('/:id', deleteRule);

export default reglamentoRouter;

