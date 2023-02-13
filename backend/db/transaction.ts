import { ObjectId } from "mongodb"
import { db } from "../api/server"
import { Transaction } from "./_models"

const collection = db.collection('transactions')

const add_new_transaction = async (transaction: Transaction) : Promise<Transaction|null> => {
    await collection.insertOne(transaction)

    return transaction
}

const get_transactions_by_user_id = async (id: string) : Promise<Transaction[]> => {
    const transactions:any = await collection.find({ user_id: new ObjectId(id) }).toArray()
    
    return transactions
}

export {
    add_new_transaction,
    get_transactions_by_user_id
}