import { Component, Input } from '@angular/core';
import { IUser } from './models/IUser';
import { AuthService } from './services/auth.service';
import { TradeRecordService } from './services/trade-record.service';
import { ApiTradeRecord } from './models/IApiTrade';


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
  showSelectTable: boolean = false; // todo logic for showing after file upload
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

  clearRecords() : void {
    this.tradeRecordService.clearAll();
    this.showTable = false;
  }

  deleteTradeRecord(id: string) : void {
    console.log("Deleting report ...");
    this.tradeRecordService.deleteTradeRecord("3ebceae4-c5fa-4fb1-92c5-1ae637c7cdf4");
  }

  deleteReport(id: string) : void {
    // this.tradeRecordService.deleteReport(id);
    this.tradeRecordService.deleteReport("3ebceae4-c5fa-4fb1-92c5-1ae637c7cdf4");
  }


  // for testing update
  updateTradeRecord() : void {
    const trade = new ApiTradeRecord(
      "75b5e515-ad80-48b3-9d9a-d53bb75ae6fe",
      "2023-06-21T11:39:29.016644200",
      "b2de0642-71ef-431e-82d7-cf426e7b3798",
      "80.1803835525",
      "9999",
      "0.0801803835525",
      "0",
      "0.17724318",
      "0"
    );

    this.tradeRecordService.updateTradeRecord(trade)
  }

}
