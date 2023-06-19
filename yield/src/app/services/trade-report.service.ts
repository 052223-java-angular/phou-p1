import { Injectable } from '@angular/core';
import { ITrade } from '../models/Trade';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TradeReportService {
  tradeRecords!: ITrade[];

  constructor(
    private httpCient: HttpClient
  ) { }

  // DQL
  getLocalTradeRecords() : ITrade[] | null {
    return this.tradeRecords;
  }

  getLocalTradeRecordById(id: number) : ITrade | null {
    return this.tradeRecords[id];
  }

  getTradeRecords() : ITrade[] | null {
    // todo http
    return [];
  }

  getTradeRecordById(id: number) : ITrade | null {
    // todo http
    return null;
  }

  // DML methods

  saveLocalTradeRecords(tradeRecords: ITrade[]) : void {
    this.tradeRecords = tradeRecords;
  }

  updateLocalTradeRecord(index: number, tradeRecord: ITrade) : void {
    this.tradeRecords[index] = tradeRecord;
  }

  deleteLocalTradeRecord(index: number) : void {
    this.tradeRecords.splice(index, 1);
  }

  saveTradeRecords(tradeRecords: ITrade[]) : void {
    // todo http
  }

  updateTradeRecord(tradeRecord: ITrade) : void {
    // todo http
  }

  deleteTradeRecord(tradeRecord: ITrade) : void {
    // todo http
  }

}
