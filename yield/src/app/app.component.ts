import { Component, Input } from '@angular/core';
import { IUser } from './models/IUser';
import { AuthService } from './services/auth.service';
import { TradeRecordService } from './services/trade-record.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Angular app';
  loggedInUser!: IUser;
  showLineChart: boolean = false;
  showBarChart: boolean = false;
  showMarketCard: boolean = false;
  showProfitLossCard: boolean = false;
  showFrequencyCard: boolean = false;
  showTradeCard: boolean = false;
  showSelectTable: boolean = false;
  showTable: boolean = false;
  didUploadFile: boolean = false;

  constructor(
    private authService : AuthService,
    private tradeRecordService: TradeRecordService
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
    console.log("Saving trades...")
    this.tradeRecordService.saveTradeRecordsToApi()
  }

  getTradeRecords() : void {
    console.log("Getting trades ...")
    this.tradeRecordService.getTradeRecordsFromApi();
    this.showTable = true;
  }

  getTradeRecordById() : void {
    this.tradeRecordService.getTradeRecordById("75b5e515-ad80-48b3-9d9a-d53bb75ae6fe");
  }

  getReportIds() : void {
    console.log("Getting report ids ...");
    this.tradeRecordService.getTradeRecordsReportIds();
  }

  fetchApiProfitLossRecords() : void {
    console.log("Getting profit and loss records ... ")
    this.tradeRecordService.fetchApiProfitLossRecords();
    this.showTable = true;
  }

  clearRecords() : void {
    this.tradeRecordService.clearAll();
    this.showTable = false;
  }

}
