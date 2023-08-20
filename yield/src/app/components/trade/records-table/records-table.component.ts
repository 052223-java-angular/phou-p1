import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { TradeService } from '../service/trade.service';
import { Observable, map } from 'rxjs';
import { ITradeRecord, TradeRecord } from '../model/TradeRecord';
import { IHeaderField } from '../model/HeaderField';

@Component({
  selector: 'app-records-table',
  templateUrl: './records-table.component.html',
  styleUrls: ['./records-table.component.css']
})
export class RecordsTableComponent implements OnInit {
  constructor(private tradeService: TradeService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.headerFieldCount = this.tradeService.headerFieldColCount.value;
    this.filteredTradeRecords$ = this.tradeService.filteredTradeRecords;
    this.filteredHeaderFields$ = this.tradeService.filteredHeaderFields;
  }

  filteredHeaderFields$!: Observable<IHeaderField[]>;
  filteredTradeRecords$!: Observable<ITradeRecord[]>;
  headerFieldCount!: number;

  pageNum: number = 1;
  pageSize: number = 50;

  showEditModal: boolean = false;
  editRow!: number;
  tradeRecord!: TradeRecord;

  onRaiseEditEvent(record: ITradeRecord) : void { 
    this.tradeService.raiseEditRecordChange(record);
    this.showEditModal = false;
  }

  editTradeRecord(index: number, tradeRecords: TradeRecord[]) {
    this.showEditModal = !this.showEditModal;
    this.tradeRecord = tradeRecords[index];
  }

  deleteTradeRecord(index: number, tradeRecords: TradeRecord[]) {
    tradeRecords.splice(index, 1);
  }

}
