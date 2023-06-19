import { Injectable } from '@angular/core';
import { ITrade, Trade } from '../models/Trade';
import { HttpClient } from '@angular/common/http';
import { Header, IHeader } from '../models/Header';



//====================================
// Service for handling the get, save, update or delete of trade records
//
//====================================
@Injectable({
  providedIn: 'root'
})
export class TradeRecordService {
  localTradeRecords: ITrade[] = [];
  localHeaderFields: IHeader[] = [];

  rawTradeRecords: string[] = [];
  rawHeaderFields: string[] = [];

  private tradeColumnOptions: string[] = ['asset', 'order_id', 'date', 'side', 'unit_price', 'qty', 'amount_paid', 'fee', 'currency_pair'];


  constructor(
    private httpCient: HttpClient
  ) {
    let arrHead = ['asset', 'order_id', 'date', 'side', 'unit_price', 'qty', 'amount_paid', 'fee', 'currency_pair']
    this.localTradeRecords.push(new Trade('2022-04-02 10:24:03','6247b3c2d332c0000176aee6','BNB-USDT','buy',452.375,0.17724318,80.1803835525,0.0801803835525,'USDT'))
    this.localTradeRecords.push(new Trade('2022-04-02 10:24:03','6247b3c2d332c0000176aee6','BNB-USDT','buy',452.369,0.1815,82.1049735,0.0821049735,'USDT'),)
    this.localTradeRecords.push(new Trade('2022-04-02 10:24:03','6247b3c2d332c0000176aee6','BNB-USDT','buy',452.369,0.1815,82.1049735,0.0821049735,'USDT'),)
    
    // console.log(this.localTradeRecords)
    for (let i = 0; i < arrHead.length; i++) {
      this.localHeaderFields.push(new Header(arrHead[i], i+1));
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
    return this.localHeaderFields;
  }

  // DQL
  getLocalTradeRecords() : ITrade[] {
    return this.localTradeRecords;
  }

  getLocalTradeRecordById(id: number) : ITrade {
    return this.localTradeRecords[id];
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
    this.localHeaderFields = [];
  }

  clearLocalTradeRecords() : void {
    this.localTradeRecords = [];
  }

  addLocalHeaderField(headerField: IHeader) : void {
    this.localHeaderFields.push(headerField);
  }

  addLocalTradeRecord(localTradeRecord: ITrade) : void {
    this.localTradeRecords.push(localTradeRecord);
  }

  saveLocalHeaderFields(headerFields: IHeader[]) : void {
    this.localHeaderFields = headerFields;
  } 

  saveLocalTradeRecords(tradeRecords: ITrade[]) : void {
    this.localTradeRecords = tradeRecords;
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

      console.log(idx);
      this.localTradeRecords[idx].asset = asset;
      this.localTradeRecords[idx].orderId = orderId
      this.localTradeRecords[idx].date  = date;
      this.localTradeRecords[idx].side = side;
      this.localTradeRecords[idx].unitPrice = unitPrice;
      this.localTradeRecords[idx].qty = qty;
      this.localTradeRecords[idx].amountPaid = amountPaid;
      this.localTradeRecords[idx].fee = fee;
      this.localTradeRecords[idx].currencyPair = currencyPair;

      console.log(this.localTradeRecords[idx]);
    return this.localTradeRecords[idx+1];
  }


  updateLocalTradeRecord(tradeRecord: ITrade) : ITrade {
    const idx = tradeRecord.index ?? 0;
    this.localTradeRecords[idx] = tradeRecord;
    return this.localTradeRecords[idx];
  }

  deleteLocalTradeRecord(index: number) : ITrade[] {
    this.localTradeRecords.splice(index, 1);
    return this.localTradeRecords;
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
