import { MongoClient } from "mongodb";

export const getDb = () => {
    if (!process.env.MONGO_URL) {
        throw 'MONGO_URL not set';
    }
    const client = new MongoClient(process.env.MONGO_URL)

    const db = client.db('trading_stock')

    return db
}