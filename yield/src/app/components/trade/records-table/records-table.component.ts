import { Component, Input, OnInit } from '@angular/core';
import { TradeService } from '../service/trade.service';
import { Observable } from 'rxjs';

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

  filteredHeaderFields$!: Observable<string[]>;
  filteredTradeRecords$!: Observable<string[]>;
  headerFieldCount$!: Observable<number>;

  pageNum: number = 1;
  pageSize: number = 50;

}
