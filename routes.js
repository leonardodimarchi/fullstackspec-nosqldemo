import { Router } from 'express';
import {
    createNewTransaction,
    getTransaction,
    getTransactions,
    patchTransaction,
    removeTransaction,
    replaceExistingTransaction,
} from './controllers/transactionsController.js';
import {
    createNewUser,
    getBalance,
    getUser,
    getUsers,
    patchUser,
    removeUser,
    replaceExistingUser,
} from './controllers/usersController.js';

const router = Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Finance control API',
        resources: ['/users', '/transactions', '/users/:id/balance'],
    });
});

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', createNewUser);
router.put('/users/:id', replaceExistingUser);
router.patch('/users/:id', patchUser);
router.delete('/users/:id', removeUser);
router.get('/users/:id/balance', getBalance);

router.get('/transactions', getTransactions);
router.get('/transactions/:id', getTransaction);
router.post('/transactions', createNewTransaction);
router.put('/transactions/:id', replaceExistingTransaction);
router.patch('/transactions/:id', patchTransaction);
router.delete('/transactions/:id', removeTransaction);

export default router;
