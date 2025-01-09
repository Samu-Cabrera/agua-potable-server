import { Router } from 'express';
import { getAuditLogs } from '../controllers/auditLog.controller.js';

const auditRouter = Router();

auditRouter.get('/list', getAuditLogs);

export default auditRouter;

