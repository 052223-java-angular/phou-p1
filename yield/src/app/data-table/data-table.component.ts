import { Component, Input, OnInit, DoCheck } from '@angular/core';
import { ITrade, LocalTrade } from '../models/ITrade';
import { Header, IHeader } from '../models/Header';
import { TradeRecordService } from '../services/trade-record.service';
import { TradeReportService } from '../services/trade-report.service';
import { IApiTrade } from '../models/IApiTrade';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, DoCheck {

  // for edit modal
  showModal: boolean = false;
  tradeRecord!: ITrade;

  // for showing trade records
  tradeRecords: ITrade[] = [];
  headerRow: IHeader[] = [];

  // for api trade records
  apiTradeRecords: IApiTrade[] = [];
  apiHeaderFields: IHeader[] = [];

  // for showing table
  @Input() showDataTable: boolean = false;

  constructor(
    private tradeRecordService: TradeRecordService,
    private tradeReportService: TradeReportService
    ) { }

  ngOnInit(): void {
    console.log("data table initializing ... ")
  }

  ngDoCheck(): void {
    this.headerRow = this.tradeRecordService.getLocalHeaderFields();
    this.tradeRecords = this.tradeRecordService.getLocalTradeRecords().slice(0,20);

    if (this.tradeRecords.length == 0) {
      this.apiHeaderFields = this.tradeRecordService.getApiHeaderFields();
      this.apiTradeRecords = this.tradeRecordService.getApiTradeRecords();
    }
    
    console.log("data table ngDoCheck initializing ... +trade");
  }

  // saveTradeRecords() : void {
  //   this.apiTradeRecords = this.tradeRecordService.saveTradeRecordsToApi();
  // }


  showEditTradeRecordModal(index: number, tradeRecord: LocalTrade) {
    console.log("Editing index : "+index);
    tradeRecord.index = index;
    this.tradeRecord = tradeRecord;
    this.showModal = !this.showModal;
  }


  commitTradeDelete(index: number, tradeRecord: LocalTrade) {
    this.tradeRecords = this.tradeRecordService.deleteLocalTradeRecord(index);
    console.log('Deleting record ...')
  }

}
