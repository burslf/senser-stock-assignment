import express, { Request, Response } from 'express';
import { get_user_by_id } from '../../db/user';

const router = express.Router()

router.get('/:id', async (req: Request, res: Response) => {
    const userId = req.params.id;

    if (!userId) {
        return res.status(400).send({ error: 'Invalid request' });
    }

    try {
        const user = await get_user_by_id(userId);
        return res.json(user);
    }catch(e: any) {
        return res.status(400).json({ error: e.message });
    }

})

export { router }