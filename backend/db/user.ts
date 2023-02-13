import { ObjectId } from "mongodb"
import { db } from "../api/server"
import { stock_prices } from "../stockPrices"
import { User } from "./_models"

const collection = db.collection('users')

const add_user = async (user: User) : Promise<User|null> => {
    await collection.insertOne(user)

    return user
}

const get_all_users = async () : Promise<User[]> => {
    const users:any = await collection.find({}).toArray()

    return users
}

const get_user_by_id = async (id: string) : Promise<User|null> => {
    const user:any = await collection.findOne({ _id: new ObjectId(id) })

    return user
}

const update_user_holding = async (id: string, symbol: string, quantity: number, balanceInc: number) => {
    await collection.updateOne({ _id: new ObjectId(id) }, { $inc: { [`holdings.${symbol}`] : quantity, 'balance': balanceInc } })
}

export {
    add_user,
    get_all_users,
    get_user_by_id,
    update_user_holding
}