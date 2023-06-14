import { Component, Input } from '@angular/core';
import { IUser } from './models/IUser';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Angular app';
  @Input() user!: IUser;
  showLineChart: boolean = false;
  showBarChart: boolean = false;
  showMarketCard: boolean = false;
  showProfitLossCard: boolean = false;
  showFrequencyCard: boolean = false;
  showTradeCard: boolean = false;
  showDataTable: boolean = false;

  constructor(
    private authService : AuthService
  ) {}

  toggleLineChart() : void {
    this.showLineChart = !this.showLineChart;
  }

  toggleBarChart() : void {
    this.showBarChart = !this.showBarChart;
  }

  toggleMarketCard() : void {
    this.showMarketCard = !this.showMarketCard;
  }

  toggleProfitLossCard() : void {
    this.showProfitLossCard = !this.showProfitLossCard;
  }

  toggleFrequencyCard() : void {
    this.showFrequencyCard = !this.showFrequencyCard;
  }

  toggleTradeCard() : void {
    this.showTradeCard = !this.showTradeCard;
  }

  saveTrades() : void {
    // todo persist trades to 
    console.log("Saving trades")
  }



}
