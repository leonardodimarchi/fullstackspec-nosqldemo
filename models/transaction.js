import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true, index: true },
        type: { type: String, enum: ['income', 'expense'], required: true, index: true },
        category: { type: String, required: true, trim: true, index: true },
        date: { type: Date, required: true, default: Date.now, index: true },
        value: { type: Number, required: true, min: 0.01 },
        description: { type: String, trim: true },
    },
    { collection: 'transactions', timestamps: true }
);

export const Transaction = mongoose.model('Transaction', transactionSchema, 'transactions');
