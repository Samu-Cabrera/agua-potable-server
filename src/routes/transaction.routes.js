import { Router } from 'express';
import { check } from 'express-validator';
import { createTransaction, getTransaction, updateTransaction, getTransactions, deleteTransaction } from '../controllers/transaction.controller.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { validarCampos } from '../middlewares/validar-campos.middleware.js';

const transactionRouter = Router();

transactionRouter.post('/', [
    validarJWT,
    validarCampos
], createTransaction);

transactionRouter.get('/', getTransactions);

transactionRouter.get('/:id', getTransaction);

transactionRouter.put('/:id', [
    validarJWT,
    check('id', 'El id es obligatorio.').isMongoId(),
    validarCampos
], updateTransaction);

transactionRouter.delete('/:id', [
    validarJWT,
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'El id es obligatorio.').isMongoId(),
    validarCampos
], deleteTransaction);

export default transactionRouter;