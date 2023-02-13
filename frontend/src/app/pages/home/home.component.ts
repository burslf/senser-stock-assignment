import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { StockService } from 'app/services/stock.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { percentageVariation } from 'app/utils';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    class: 'home'
  }
})
export class HomeComponent {
  stocks: any;
  stockPrices: any;
  stockPricesVariation: any;

  userStocks: any;
  stockQtyInput: any = {};

  qtyError: any = {};

  constructor(
    private stockService: StockService,
  ) {
    this.stockService.stocks.subscribe((s: any) => {
      const newStocks = [];
      const pricesVariation: any = {};

      for (const stock in s) {
        newStocks.push({
          name: stock,
          price: s[stock]
        });
        this.qtyError[stock] = {
          status: false,
          message: ''
        }
        pricesVariation[stock] = percentageVariation(s[stock], this.stockService.stocks.value[stock])
      }
      this.stocks = newStocks;
      this.stockPricesVariation = pricesVariation;
    });

    this.stockService.userStocks.subscribe((s: any) => {
      this.userStocks = s;
    });

    this.stockService.stockPrices.subscribe((s: any) => {
      const newPriceVariations: any = {};
      for(const stock in s) {
        const variation = percentageVariation(s[stock], this.stockService.stocks.value[stock])
        newPriceVariations[stock] = variation
      }
      this.stockPrices = s;
      this.stockPricesVariation = newPriceVariations;
    });
  }

  ngOnInit(): void {

  }

  buyStock(stock: any) {
    // If user doesn't have enough money to buy stock, set qtyError[stock] to true
    if (!this.stockQtyInput[stock] || this.stockQtyInput[stock].length == 0) {
      this.raiseInputError(stock, 'Invalid quantity')
      return;

    }

    const qtyToBuy = Number(this.stockQtyInput[stock])

    if (this.userStocks.balance < (this.stockPrices[stock] * qtyToBuy)) {
      this.raiseInputError(stock, 'Too poor to buy this stock')
      return;
    }

    this.resetInputError(stock);

    this.stockService.buyStock('63e7b093a8c117d479b5878a', stock, qtyToBuy)
      .subscribe({
        next: (res: any) => {
          this.refreshValuesOnHttpResponse();
        },
        error: (err: any) => {
          console.log(err)
        }
      })

  }

  sellStock(stock: any) {
    // If user doesn't have enough stock to sell, set qtyError[stock] to true
    if (!this.stockQtyInput[stock] || this.stockQtyInput[stock].length == 0) {
      this.raiseInputError(stock, 'Invalid quantity')
      return;
    }
    const qtyToSell = Number(this.stockQtyInput[stock])

    if (this.userStocks.holdings[stock] < qtyToSell) {
      this.raiseInputError(stock, 'Not enough stock to sell')
      return;
    }

    this.resetInputError(stock);

    this.stockService.sellStock('63e7b093a8c117d479b5878a', stock, qtyToSell)
      .subscribe({
        next: (res: any) => {
          this.refreshValuesOnHttpResponse();
        },
        error: (err: any) => {
          console.log(err)
        }
      })
  }

  raiseInputError(stock: any, message: string) {
    this.qtyError[stock].status = true;
    this.qtyError[stock].message = message;
  }

  resetInputError(stock: any) {
    this.qtyError[stock].status = false;
    this.qtyError[stock].message = '';
  }

  refreshValuesOnHttpResponse() {
    this.stockService.getUserTransactions('63e7b093a8c117d479b5878a')
      .subscribe((t: any) => {
        this.stockService.setUserTransactions(t.reverse());
      })
    this.stockService.getUserStocks('63e7b093a8c117d479b5878a')
      .subscribe((s: any) => {
        this.stockService.setUserStocks(s);
      });
  }
}
