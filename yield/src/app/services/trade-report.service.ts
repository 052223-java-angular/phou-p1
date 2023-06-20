import { Injectable } from '@angular/core';
import { TradeRecordService } from './trade-record.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TradeReportService {

  constructor(
    private tradeRecordService: TradeRecordService,
    private httpClient: HttpClient
  ) { }

  // generate profit and loss 
    // usd pair
    // other major pairs 
    // profitability over time comparison by major pairs
  // get hisorical price of major pairs
    // historical price movement between pairs
  // run frequency reports
    // most traded, least traded, least and more profitable
    // most profitable months
  // run reports by date or date range, 7, 14, 28, 60, 90, 120, 180, 360
  


}
