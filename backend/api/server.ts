require('dotenv').config();

import express from 'express';
import http from 'http';
import io from 'socket.io';
import cors from 'cors';

// Export the database connection so that it can be used in routes files
import { getDb } from '../db/_connection';
export const db = getDb()

import { router as HealthCheckRoutes } from './routes/healthCheck';
import { router as UserRoutes } from './routes/user';
import { router as TransactionRoutes } from './routes/transaction';
import { stock_prices } from '../stockPrices';
import { updateStockPrices } from '../services/stockPriceUpdate';

const PORT = 3333;

const app = express()
const server = http.createServer(app);

const socket = new io.Server(server, { cors: { origin: '*' } });

socket.on('connection', (socket) => {
    console.log('New client connected')
    socket.emit('stock_prices', stock_prices)
});

app.use(express.json())
app.use(cors())

app.use('/health-check', HealthCheckRoutes)

app.use('/user', UserRoutes);
app.use('/tx', TransactionRoutes);

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
    updateStockPrices(socket);
})