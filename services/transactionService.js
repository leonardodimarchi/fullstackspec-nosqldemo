import { Transaction } from '../models/transaction.js';
import { parseDate, parseListParam } from '../utils/paramsUtils.js';
import { isValidObjectId } from "../utils/validationUtils.js";
import { ensureUserExists } from './userService.js';

export const buildTransactionFilter = (query) => {
    const filter = {};

    const queryUserId = query.userId;

    if (queryUserId) {
        if (!isValidObjectId(queryUserId)) {
            const error = new Error('Invalid user ID');
            error.statusCode = 400;
            throw error;
        }

        filter.userId = queryUserId;
    }

    const types = parseListParam(query.types);

    if (!!types.length) {
        filter.type = { $in: types };
    }

    const categories = parseListParam(query.categories);

    if (!!categories.length) {
        filter.category = { $in: categories };
    }

    const dateFrom = parseDate(query.dateFrom || query.startDate, 'dateFrom');
    const dateTo = parseDate(query.dateTo || query.endDate, 'dateTo');

    if (dateFrom || dateTo) {
        filter.date = {};

        if (dateFrom) {
            filter.date.$gte = dateFrom;
        }

        if (dateTo) {
            filter.date.$lte = dateTo;
        }
    }

    return filter;
};

export const listTransactions = async (query) => Transaction.find(buildTransactionFilter(query))
    .sort({ date: -1, createdAt: -1 });

export const getTransactionById = (id) => Transaction.findById(id);
export const createTransaction = async (data) => {
    await ensureUserExists(data.userId);

    return Transaction.create(data);
};

export const replaceTransaction = async (id, data) => {
    validateTransactionInput(data);
    await ensureUserExists(data.userId);

    return Transaction.findOneAndReplace(
        { _id: id },
        {
            userId: data.userId,
            type: data.type,
            category: data.category,
            date: data.date,
            value: data.value,
            description: data.description,
        },
        { returnDocument: 'after', runValidators: true }
    );
};

export const updateTransaction = async (id, data) => {
    if (data.userId) {
        await ensureUserExists(data.userId);
    }

    return Transaction.findByIdAndUpdate(
        id,
        data,
        { returnDocument: 'after', runValidators: true }
    );
};

export const deleteTransaction = (id) => Transaction.findByIdAndDelete(id);

export const validateTransactionInput = (body) => {
    const { userId, type, category, date, value } = body;

    if (userId === undefined || type === undefined || category === undefined || date === undefined || value === undefined) {
        const error = new Error('PUT requires all fields: userId, type, category, date, value');
        error.statusCode = 400;
        throw error;
    }
};
