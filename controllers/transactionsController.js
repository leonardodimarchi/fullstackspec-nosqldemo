import {
    createTransaction,
    deleteTransaction,
    getTransactionById,
    listTransactions,
    replaceTransaction,
    updateTransaction,
} from '../services/transactionService.js';
import { handleError } from '../utils/errorUtils.js';

export const getTransactions = async (req, res) => {
    try {
        const transactions = await listTransactions(req.query);
        res.json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        handleError(res, error, 'Failed to fetch transactions');
    }
};

export const getTransaction = async (req, res) => {
    try {
        const transaction = await getTransactionById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        res.json(transaction);
    } catch (error) {
        console.error('Error fetching transaction:', error);
        res.status(500).json({ error: 'Failed to fetch transaction' });
    }
};

export const createNewTransaction = async (req, res) => {
    try {
        const transaction = await createTransaction(req.body);
        res.status(201).json(transaction);
    } catch (error) {
        console.error('Error creating transaction:', error);
        handleError(res, error, 'Failed to create transaction');
    }
};

export const replaceExistingTransaction = async (req, res) => {
    try {
        const updatedTransaction = await replaceTransaction(req.params.id, req.body);

        if (!updatedTransaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        res.json(updatedTransaction);
    } catch (error) {
        console.error('Error updating transaction:', error);
        handleError(res, error, 'Failed to update transaction');
    }
};

export const patchTransaction = async (req, res) => {
    try {
        const updatedTransaction = await updateTransaction(req.params.id, req.body);

        if (!updatedTransaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        res.json(updatedTransaction);
    } catch (error) {
        console.error('Error updating transaction:', error);
        handleError(res, error, 'Failed to update transaction');
    }
};

export const removeTransaction = async (req, res) => {
    try {
        const deletedTransaction = await deleteTransaction(req.params.id);

        if (!deletedTransaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(400).json({ error: 'Failed to delete transaction', details: error.message });
    }
};
