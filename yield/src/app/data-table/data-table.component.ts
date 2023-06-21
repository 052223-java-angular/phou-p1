import { Component, Input, OnInit, AfterContentChecked } from '@angular/core';
import { ITrade, LocalTrade } from '../models/ITrade';
import { Header, IHeader } from '../models/Header';
import { TradeRecordService } from '../services/trade-record.service';
import { TradeReportService } from '../services/trade-report.service';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, AfterContentChecked {

  // for edit modal
  showModal: boolean = false;
  tradeRecord!: ITrade;

  // for showing trade records
  tradeRecords: ITrade[] = [];
  headerRow: IHeader[] = [];
  tempRecords: string[] = [];
  tempHeader: string[] = [];

  // for showing table
  @Input() showDataTable: boolean = false;

  constructor(
    private tradeRecordService: TradeRecordService,
    private tradeReportService: TradeReportService
    ) { }

  ngOnInit(): void {

    // temp for development
    if (!this.showDataTable) {
      this.headerRow = this.tradeRecordService.getLocalHeaderFields();
      this.tradeRecords = this.tradeRecordService.getLocalTradeRecords();
      // this.tradeReportService.initLocalTradesSides();
      // this.tradeReportService.initProfitAndLoss();
      // console.log(this.tradeRecords)
    }
    
  }

  ngAfterContentChecked(): void {
    if (this.showDataTable) {
      this.headerRow = this.tradeRecordService.getLocalHeaderFields();
      this.tradeRecords = this.tradeRecordService.getLocalTradeRecords().slice(1,20);
    }
  }

  editTrade(index: number, tradeRecord: LocalTrade) {
    console.log(index);
    tradeRecord.index = index;
    this.tradeRecord = tradeRecord;
    this.showModal = !this.showModal;
  }


  deleteTrade(index: number, tradeRecord: LocalTrade) {
    this.tradeRecords = this.tradeRecordService.deleteLocalTradeRecord(index);
    console.log('Deleting record ...')
  }

}
