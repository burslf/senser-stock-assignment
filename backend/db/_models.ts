import { ObjectId } from "mongodb"

interface User {
    _id?: ObjectId
    name: string
    balance: number
    holdings: any
    timestamp: number
}

interface Transaction {
    _id?: ObjectId
    user_id: ObjectId
    symbol: string
    action: string
    quantity: number
    price: number
    timestamp: number
}

export type {
    User,
    Transaction
}