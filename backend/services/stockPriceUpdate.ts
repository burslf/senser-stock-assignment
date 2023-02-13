import socket from "socket.io";
import { stock_prices } from "../stockPrices";

export const updateStockPrices = async (socket: socket.Server) => {
    // Update the stock prices every second
    setInterval(() => {
        for (const symbol in stock_prices) {
            // Generate a random number to update the stock price
            const randomNumber = Math.floor(Math.random() * 10) - 5;
            stock_prices[symbol] += randomNumber;
        }
        // Emit the updated stock price to all connected clients
        socket.emit('stock_update', stock_prices);
    }, 1000);
}