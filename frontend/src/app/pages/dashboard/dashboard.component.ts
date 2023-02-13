import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { StockService } from 'app/services/stock.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  columns = [
    {
      columnDef: 'symbol',
      header: 'Symbol',
      cell: (element: Transaction) => `${element.symbol}`,
    },
    {
      columnDef: 'action',
      header: 'Action',
      cell: (element: Transaction) => `${element.action}`,
    },
    {
      columnDef: 'price',
      header: 'Price',
      cell: (element: Transaction) => `${element.price}`,
    },
    {
      columnDef: 'quantity',
      header: 'Quantity',
      cell: (element: Transaction) => `${element.quantity}`,
    },
  ];

  displayedColumns = this.columns.map(c => c.columnDef);

  userTransactions: Transaction[]

  constructor(
    private stockService: StockService
  ) { 
    this.stockService.getUserTransactions('63e7b093a8c117d479b5878a').subscribe((res: any) => {
      setTimeout(() => {
        this.stockService.setUserTransactions(res.reverse());
      }, 700)
      console.log(this.userTransactions);
    })
  }

  ngOnInit(): void {
    this.stockService.userTransactions.subscribe((res: any) => {
      this.userTransactions = res;
    })
  }
}

export interface Transaction {
  _id: string;
  action: number;
  symbol: string;
  price: number;
  quantity: number;
  timestamp: number;
  user_id: string;
}
