import { Component, Input, OnInit, AfterContentChecked } from '@angular/core';
import { FileService } from '../services/file.service';
import { ITrade, Trade } from '../models/Trade';
import { Header, IHeader } from '../models/Header';
import { TradeRecordService } from '../services/trade-record.service';


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
    private tradeRecordService: TradeRecordService
    ) { }

  ngOnInit(): void {

    // temp for development
    if (!this.showDataTable) {
      this.headerRow = this.tradeRecordService.getLocalHeaderFields();
      this.tradeRecords = this.tradeRecordService.getLocalTradeRecords();
    }
    
  }

  ngAfterContentChecked(): void {
    this.headerRow = this.tradeRecordService.getLocalHeaderFields();
    this.tradeRecords = this.tradeRecordService.getLocalTradeRecords().slice(1,20);
  }

  editTrade(index: number, tradeRecord: Trade) {
    tradeRecord.index = index;
    this.tradeRecord = tradeRecord;
    this.showModal = !this.showModal;
  }


  deleteTrade(index: number, tradeRecord: Trade) {
    this.tradeRecords = this.tradeRecordService.deleteLocalTradeRecord(index);
    console.log('Deleting record ...')
  }

}
