import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(
    private http: HttpClient
  ) { }

  stocks = new BehaviorSubject(null);
  stockPrices = new BehaviorSubject(null);

  userStocks = new BehaviorSubject(null);
  userTransactions = new BehaviorSubject(null);

  setStocks(stocks: any) {
    this.stocks.next(stocks);
  }
  setStockPrices(stockPrices: any) {
    this.stockPrices.next(stockPrices);
  }

  setUserStocks(userStock: any) {
    this.userStocks.next(userStock);
  }

  setUserTransactions(userTransactions: any) {
    this.userTransactions.next(userTransactions);
  }

  getUserStocks(userId: string) {
    return this.http.get(`http://localhost:3333/user/${userId}`);
  }

  getUserTransactions(userId: string) {
    return this.http.get(`http://localhost:3333/tx/history/${userId}`);
  }

  buyStock(userId: string, symbol: string, quantity: number) {
    return this.http.post(`http://localhost:3333/tx/buysell`, {
      userId: userId,
      symbol: symbol,
      action: 'buy',
      quantity: quantity
    });
  }

  sellStock(userId: string, symbol: string, quantity: number) {
    return this.http.post(`http://localhost:3333/tx/buysell`, {
      userId: userId,
      symbol: symbol,
      action: 'sell',
      quantity: quantity
    });
  }
  
}
