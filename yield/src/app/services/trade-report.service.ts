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
  // get hisorical price of major pairs
  // run frequency reports
    // most traded, least traded, least and more profitable


}
