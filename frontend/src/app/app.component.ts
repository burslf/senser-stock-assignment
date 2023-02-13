import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { io } from "socket.io-client";

import { LayoutComponent } from './layout/layout.component';
import { StockService } from './services/stock.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LayoutComponent,
    HttpClientModule
  ],
  providers: [
    StockService
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    class: 'app-root'
  }
})
export class AppComponent {
  constructor(
    private stockService: StockService,
    private themeService: ThemeService
  ) {}

  socket = io('ws://localhost:3333');
  stockPrices: any;
  userStocks: any;

  ngOnInit() {
    // Check theme from localstorage 
    this.setThemeFromLocalStorage();

    this.stockService.stocks.subscribe((s: any) => this.stockPrices = s);
    this.stockService.userStocks.subscribe((s: any) => this.userStocks = s);

    this.getUserStocks()

    this.listenToSocketEvents();
  }

  listenToSocketEvents() {
    this.socket.on('connect', () => {
      console.log('Connected to server');
    });
    this.socket.on('stock_prices', (stockPrices) => {
      setTimeout(() => {
        this.stockService.setStocks(stockPrices);
      }, 700)
    });
    this.socket.on('stock_update', (stockUpdate) => {
      setTimeout(() => {
        this.stockService.setStockPrices(stockUpdate);
      }, 700)
    });
  }

  getUserStocks() {
    this.stockService.getUserStocks('63e7b093a8c117d479b5878a')
    .subscribe((s: any) => {
      setTimeout(() => {
        this.stockService.setUserStocks(s);
      }, 700)
    }); 
  }

  setThemeFromLocalStorage() {
    const theme = localStorage.getItem('theme');
    if (theme) {
      if (theme == 'dark'){
        this.themeService.setDarkMode(true);
      }else if (theme == 'light'){
        this.themeService.setDarkMode(false);
      }
    }
  }
}
