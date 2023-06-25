import { Component, Input, OnInit, AfterContentChecked } from '@angular/core';
import { ITrade, LocalTrade } from '../models/ITrade';
import { Header, IHeader } from '../models/Header';
import { TradeRecordService } from '../services/trade-record.service';
import { TradeReportService } from '../services/trade-report.service';
import { IApiTrade } from '../models/IApiTrade';
import { IReport } from '../models/IReport';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, AfterContentChecked {

  // for edit modal
  showModal: boolean = false;
  tradeRecord!: ITrade;
  apiTradeRecord!: IApiTrade;

  // for showing trade records
  tradeRecords: ITrade[] = [];
  headerRow: IHeader[] = [];

  // for api trade records
  apiTradeRecords: IApiTrade[] = [];
  apiHeaderFields: IHeader[] = [];

  // for profit loss table
  apiProfitLossRecords: IReport[] = [];
  apiProfitLossFields: IHeader[] = [];

  // for showing table
  @Input() showDataTable: boolean = false;

  constructor(
    private tradeRecordService: TradeRecordService,
    private tradeReportService: TradeReportService
    ) { }

  ngOnInit(): void {
    console.log("data table initializing ... ")
  }

  ngAfterContentChecked(): void {
    this.headerRow = this.tradeRecordService.getLocalHeaderFields();
    this.tradeRecords = this.tradeRecordService.getLocalTradeRecords().slice(0,20);

    if (this.tradeRecords.length == 0) {
      this.apiHeaderFields = this.tradeRecordService.getApiHeaderFields();
      this.apiTradeRecords = this.tradeRecordService.getApiTradeRecords();
    } 
    if (this.apiTradeRecords.length == 0 && this.tradeRecords.length == 0) {
      // load report records 
      this.apiProfitLossFields = this.tradeRecordService.getApiProfitLossHeaderFields();
      this.apiProfitLossRecords = this.tradeRecordService.getApiProfitLossRecords();
      console.log(this.apiHeaderFields);
      console.log(this.apiProfitLossRecords);
    }
    
    console.log("data table ngDoCheck initializing ... ");
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

  showEditApiTradeModal(id: string, apiTradeRecord: IApiTrade) {
    console.log("Editing index : "+id);
    this.showModal = !this.showModal;
    this.tradeRecordService.updateApiTradeRecord(id, apiTradeRecord);
  }


  commitApiTradeDelete(id: string, apiTradeRecord: IApiTrade) {
    this.tradeRecordService.deleteApiTradeRecord(id, apiTradeRecord);
    console.log('Deleting record ...')
  }

  commitApiProfitLossDelete(id: string, apiProfitLossRecord: IReport) {

  }

}
