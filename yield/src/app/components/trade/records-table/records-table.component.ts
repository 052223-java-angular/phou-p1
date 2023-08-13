import { Component, Input, OnInit } from '@angular/core';
import { TradeService } from '../service/trade.service';
import { Observable } from 'rxjs';
import { ITradeRecord, TradeRecord } from '../model/TradeRecord';
import { IHeaderField } from '../model/HeaderField';

@Component({
  selector: 'app-records-table',
  templateUrl: './records-table.component.html',
  styleUrls: ['./records-table.component.css']
})
export class RecordsTableComponent implements OnInit {
  constructor(public tradeService: TradeService) { }

  ngOnInit(): void {
    this.headerFieldCount$ = this.tradeService.headerFieldColCount;
    this.filteredTradeRecords$ = this.tradeService.filteredTradeRecords;
    this.filteredHeaderFields$ = this.tradeService.filteredHeaderFields;
  }

  filteredHeaderFields$!: Observable<IHeaderField[]>;
  filteredTradeRecords$!: Observable<ITradeRecord[]>;
  headerFieldCount$!: Observable<number>;

  pageNum: number = 1;
  pageSize: number = 50;

  showEditModal: boolean = false;
  tradeRecord!: TradeRecord;

  onRaiseEditEvent(value: boolean) : void {
    this.showEditModal = value;
  }

  editTradeRecord(index: number, tradeRecords: TradeRecord[]) {
    this.showEditModal = !this.showEditModal;
    this.tradeRecord = tradeRecords[index];
  }

  deleteTradeRecord(index: number, tradeRecords: TradeRecord[]) {
    tradeRecords.splice(index, 1);
  }

}
