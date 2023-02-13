import { Request, Response } from "express";
import { get_user_by_id } from "../../db/user";
import { stock_prices } from "../../stockPrices";

const validateTransactionMiddleware = async (req: Request, res: Response, next: any) => {
    const userId = req.body.userId;
    const symbol = req.body.symbol;
    const action = req.body.action;
    const quantity = req.body.quantity;

    if (!userId || !symbol || !action || !quantity) {
        return res.status(400).send({ error: 'Invalid request' });
    }

    try {
        const user = await get_user_by_id(userId);
        if (!user) {
            return res.status(400).json({ error: 'Invalid user' });
        }

        const userBalance = user.balance;
        const userHolding = user.holdings[symbol];

        if (action !== 'buy' && action !== 'sell') {
            return res.status(400).json({ error: 'Invalid action' });
        }

        // Validation: check if the user has enough balance to buy the stock
        if (action == "buy" && quantity * stock_prices[symbol] > userBalance) {
            return res.status(400).json({ error: 'Insufficient funds' });
        }

        // Validation: check if the user has enough stock to sell
        if (action == "sell" && quantity > userHolding) {
            return res.status(400).json({ error: 'Not enough stock to sell' });
        }
    } catch (e: any) {
        return res.status(400).json({ error: e.message });
    }

    next();
}

export {
    validateTransactionMiddleware
}