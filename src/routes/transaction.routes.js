import { Router } from 'express';
import { createTransaction, getTransaction, updateTransaction, getTransactions, deleteTransaction } from '../controllers/transaction.controller.js';

const transactionRouter = Router();

transactionRouter.post('/', createTransaction);

transactionRouter.get('/', getTransactions);

transactionRouter.get('/:id', getTransaction);

transactionRouter.put('/:id', updateTransaction);

transactionRouter.delete('/:id', deleteTransaction);

export default transactionRouter;