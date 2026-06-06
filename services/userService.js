import { Transaction } from '../models/transaction.js';
import { User } from '../models/user.js';
import { isValidObjectId } from "../utils/validationUtils.js";

export const listUsers = () => User.find().sort({ createdAt: -1 });
export const getUserById = (id) => User.findById(id);
export const createUser = (data) => User.create(data);

export const replaceUser = async (id, data) => {
    validateUserInput(data);

    return User.findOneAndReplace(
        { _id: id },
        { name: data.name, email: data.email },
        { returnDocument: 'after', runValidators: true }
    );
};

export const updateUser = (id, data) => User.findByIdAndUpdate(
    id,
    data,
    { returnDocument: 'after', runValidators: true }
);

export const deleteUser = (id) => User.findByIdAndDelete(id);

export const getUserBalance = async (id) => {
    const user = await ensureUserExists(id);

    const [summary] = await Transaction.aggregate([
        { $match: { userId: id } },
        {
            $group: {
                _id: '$userId',
                incomeTotal: {
                    $sum: {
                        $cond: [{ $eq: ['$type', 'income'] }, '$value', 0],
                    },
                },
                expenseTotal: {
                    $sum: {
                        $cond: [{ $eq: ['$type', 'expense'] }, '$value', 0],
                    },
                },
            },
        },
    ]);

    const incomeTotal = summary?.incomeTotal || 0;
    const expenseTotal = summary?.expenseTotal || 0;

    return {
        user,
        incomeTotal,
        expenseTotal,
        balance: incomeTotal - expenseTotal,
    };
};

export const ensureUserExists = async (userId) => {
    if (!isValidObjectId(userId)) {
        const error = new Error('Invalid user ID');
        error.statusCode = 400;
        throw error;
    }

    const user = await User.findById(userId);

    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }

    return user;
};

export const validateUserInput = (body) => {
    const { name, email } = body;

    if (name === undefined || email === undefined) {
        const error = new Error('PUT requires all fields: name, email');
        error.statusCode = 400;
        throw error;
    }
};
