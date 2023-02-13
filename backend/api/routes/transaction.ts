import express, { Request, Response } from 'express';
import { stock_prices } from '../../stockPrices';
import { validateTransactionMiddleware } from '../middlewares/transaction.middleware';
import { add_new_transaction, get_transactions_by_user_id } from '../../db/transaction';
import { get_user_by_id, update_user_holding } from '../../db/user';
import { ObjectId } from 'mongodb';

const router = express.Router()

router.post('/buysell', validateTransactionMiddleware, async (req: Request, res: Response) => {
    const {userId, symbol, action, quantity } = req.body;

    // Create a new transaction
    const transaction = {
        user_id: new ObjectId(userId),
        symbol: symbol,
        action: action,
        quantity: quantity,
        price: stock_prices[symbol],
        timestamp: Date.now()
    }

    let balanceInc = transaction.price * transaction.quantity * (action == 'buy' ? -1 : 1);
    let quantityInc = quantity * (action == 'buy' ? 1 : -1);

    try {
        await add_new_transaction(transaction);
        await update_user_holding(userId, symbol, quantityInc, balanceInc);
        
        return res.json(transaction);
    }catch(e: any) {
        return res.status(400).json({ error: e.message });
    }
    
})

router.get('/history/:userId', async (req: Request, res: Response) => {
    const {userId} = req.params;

    try {
        const user = await get_user_by_id(userId);

        if (!user) return res.status(400).json({ error: 'User not found' });

        const transactions = await get_transactions_by_user_id(userId);
        return res.json(transactions);
    }catch(e: any) {
        return res.status(400).json({ error: e.message });
    }

})


export { router }