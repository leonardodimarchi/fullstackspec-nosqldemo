import {
    createUser,
    deleteUser,
    getUserBalance,
    getUserById,
    listUsers,
    replaceUser,
    updateUser,
} from '../services/userService.js';
import { handleError } from '../utils/errorUtils.js';

export const getUsers = async (req, res) => {
    try {
        const users = await listUsers();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        handleError(res, error, 'Failed to fetch users');
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await getUserById(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        handleError(res, error, 'Failed to fetch user');
    }
};

export const createNewUser = async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        handleError(res, error, 'Failed to create user');
    }
};

export const replaceExistingUser = async (req, res) => {
    try {
        const updatedUser = await replaceUser(req.params.id, req.body);

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        handleError(res, error, 'Failed to update user');
    }
};

export const patchUser = async (req, res) => {
    try {
        const updatedUser = await updateUser(req.params.id, req.body);

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        handleError(res, error, 'Failed to update user');
    }
};

export const removeUser = async (req, res) => {
    try {
        const deletedUser = await deleteUser(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        handleError(res, error, 'Failed to delete user');
    }
};

export const getBalance = async (req, res) => {
    try {
        const balance = await getUserBalance(req.params.id);

        res.json(balance);
    } catch (error) {
        console.error('Error calculating balance:', error);
        handleError(res, error, 'Failed to calculate balance');
    }
};
