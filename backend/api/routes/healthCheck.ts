import express, { Request, Response } from 'express';

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    console.log("it works")
    res.json(`Health Check: ${new Date().toUTCString()}`)
})

export {router}