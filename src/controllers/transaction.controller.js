import Transaction from '../models/Transation.js';
import { logAudit } from '../helpers/auditLog.js';

// Create new transaction
export const createTransaction = async (req, res) => {
  const { type, amount, category, description, date } = req.body;
  const { _id: loggedUserId } = req.usuario;
  try {
   const transactionData = {
      type,
      amount,
      category,
      description,
      date: new Date(date),
    };
    const transaction = new Transaction(transactionData);
    await transaction.save();
    await logAudit({
      user: loggedUserId,
      action: 'CREACIÓN DE TRANSACCIÓN',
      description: `Se creó una transacción de tipo "${type}"`,
      area: 'Gestión de Transacciones',
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: "Transacción no encontrada" });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update transaction
export const updateTransaction = async (req, res) => {
  try {
    const { _id: loggedUserId } = req.usuario;
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    await logAudit({
      user: loggedUserId,
      action: 'ACTUALIZACIÓN DE TRANSACCIÓN',
      description: `Se actualizó la transacción con ID: ${req.params.id}.`,
      area: 'Gestión de Transacciones',
    });
    if (!transaction) {
      return res.status(404).json({ message: "Transacción no encontrada" });
    }
    res.json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete transaction
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    const { _id: loggedUserId } = req.usuario;
    await logAudit({
      user: loggedUserId,
      action: 'ELIMINACIÓN DE TRANSACCIÓN',
      description: `Se eliminó la transacción con ID: ${req.params.id}.`,
      area: 'Gestión de Transacciones',
    });
    if (!transaction) {
      return res.status(404).json({ message: "Transacción no encontrada" });
    }
    res.json({ message: "Transacción eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
