import { Injectable } from '@angular/core';
import { ITrade, Trade } from '../models/Trade';
import { HttpClient } from '@angular/common/http';
import { Header, IHeader } from '../models/Header';

@Injectable({
  providedIn: 'root'
})
export class TradeRecordService {
  tradeRecords: ITrade[] = [];
  headerFields: IHeader[] = [];

  rawTradeRecords: string[] = [];
  rawHeaderFields: string[] = [];

  private tradeColumnOptions: string[] = ['asset', 'order_id', 'date', 'side', 'unit_price', 'qty', 'amount_paid', 'fee', 'currency_pair'];


  constructor(
    private httpCient: HttpClient
  ) {
    let arrHead = ['asset', 'order_id', 'date', 'side', 'unit_price', 'qty', 'amount_paid', 'fee', 'currency_pair']
    this.tradeRecords.push(new Trade('2022-04-02 10:24:03','6247b3c2d332c0000176aee6','BNB-USDT','buy',452.375,0.17724318,80.1803835525,0.0801803835525,'USDT'))
    this.tradeRecords.push(new Trade('2022-04-02 10:24:03','6247b3c2d332c0000176aee6','BNB-USDT','buy',452.369,0.1815,82.1049735,0.0821049735,'USDT'),)
    
    for (let i = 0; i < arrHead.length; i++) {
      this.headerFields.push(new Header(arrHead[i], i+1));
    }
   }

  getTradeColumnOptions() : string[] {
    return this.tradeColumnOptions;
  }

  getRawHeaderFields() : string[] {
    return this.rawHeaderFields;
   }

  getRawTradeRecords() : string[] {
    return this.rawTradeRecords;
   }

  getLocalHeaderFields() : IHeader[] {
    return this.headerFields;
  }

  // DQL
  getLocalTradeRecords() : ITrade[] {
    return this.tradeRecords;
  }

  getLocalTradeRecordById(id: number) : ITrade {
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


  addRawTradeRecord(rawTradeRecord: string) : void {
    this.rawTradeRecords.push(rawTradeRecord);
  }

  saveRawTradeRecords(rawTradeRecords: string[]) : void {
    this.rawTradeRecords = rawTradeRecords;
  }

  saveRawHeaderFields(rawHeaderFields: string) : void {
    this.rawHeaderFields = [];
    this.rawHeaderFields = this.rawHeaderFields.concat(rawHeaderFields);
  }

  //=========== for local trade records ===============//

  clearLocalHeaderFields() : void {
    this.headerFields = [];
  }

  clearLocalTradeRecords() : void {
    this.tradeRecords = [];
  }

  addLocalHeaderField(headerField: IHeader) : void {
    this.headerFields.push(headerField);
  }

  addLocalTradeRecord(localTradeRecord: ITrade) : void {
    this.tradeRecords.push(localTradeRecord);
  }

  saveLocalHeaderFields(headerFields: IHeader[]) : void {
    this.headerFields = headerFields;
  } 

  saveLocalTradeRecords(tradeRecords: ITrade[]) : void {
    this.tradeRecords = tradeRecords;
  }

  updateLocalTrade(
    asset: string, 
    orderId: string, 
    date: string, 
    side: string, 
    unitPrice: number,
    qty: number,
    amountPaid: number,
    fee: number,
    currencyPair: string, 
    idx: number ) : ITrade {

      this.tradeRecords[idx].asset = asset;
      this.tradeRecords[idx].orderId = orderId
      this.tradeRecords[idx].date  = date;
      this.tradeRecords[idx].side = side;
      this.tradeRecords[idx].unitPrice = unitPrice;
      this.tradeRecords[idx].qty = qty;
      this.tradeRecords[idx].amountPaid = amountPaid;
      this.tradeRecords[idx].fee = fee;
      this.tradeRecords[idx].currencyPair = currencyPair;

    return this.tradeRecords[idx];
  }


  updateLocalTradeRecord(tradeRecord: ITrade) : ITrade[] {
    const idx = tradeRecord.index ?? 0;
    this.tradeRecords[idx] = tradeRecord;
    return this.tradeRecords;
  }

  deleteLocalTradeRecord(index: number) : ITrade[] {
    this.tradeRecords.splice(index, 1);
    return this.tradeRecords;
  }


  //============ FOR HTTP ==============//

  saveTradeRecords(tradeRecords: ITrade[]) : void {
    // todo http
  }

  updateTradeRecord(tradeRecord: ITrade) : void {
    // todo http
  }

  deleteTradeRecord(tradeRecord: ITrade) : void {
    // todo http
  }

  //=========== PRIVATE ================//
  // private updateTradeRecordFields(idx: number) {
  //   this.tradeRecords[idx].asset = this.editForm.get('asset')?.value;
  //   this.tradeRecords[idx].orderId = this.editForm.get('orderId')?.value
  //   this.tradeRecords[idx].date  = this.editForm.get('date')?.value
  //   this.tradeRecords[idx].side = this.editForm.get('side')?.value
  //   this.tradeRecords[idx].unitPrice = this.editForm.get('unitPrice')?.value
  //   this.tradeRecords[idx].qty = this.editForm.get('qty')?.value
  //   this.tradeRecords[idx].amountPaid = this.editForm.get('amountPaid')?.value
  //   this.tradeRecords[idx].fee = this.editForm.get('fee')?.value
  //   this.tradeRecords[idx].currencyPair = this.editForm.get('currencyPair')?.value
  // }



}
