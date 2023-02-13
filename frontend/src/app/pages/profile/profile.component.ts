import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockService } from 'app/services/stock.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  userStocks: any;

  constructor(
    private stockService: StockService
  ) {
    this.stockService.userStocks.subscribe((s: any) => {
      this.userStocks = s;
    });
  }

  ngOnInit(): void {

  }
}
