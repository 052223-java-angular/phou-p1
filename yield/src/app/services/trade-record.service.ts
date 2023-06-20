import { Injectable } from '@angular/core';
import { ITrade, LocalTrade } from '../models/ITrade';
import { HttpClient } from '@angular/common/http';
import { Header, IHeader } from '../models/Header';
import { IPrice, Bnb } from '../models/IPrice';
import { ApiTradeRecord, IApiTrade } from '../models/IApiTrade';
import { FileService } from './file.service';

//====================================
// Service for handling the get, save, update or delete of trade records
//
//====================================
@Injectable({
  providedIn: 'root',
})
export class TradeRecordService {
  // for raw unformatted records
  rawTradeRecords: string[] = [];
  rawHeaderFields: string[] = [];

  // for local formatted records
  localTradeRecords: ITrade[] = [];
  localHeaderFields: IHeader[] = [];

  // for api requested trade records
  apiTradeRecords: IApiTrade[] = [];
  apiHeaderFields: string[] = [];

  // for major pair historical pricing
  priceFields: string[] = [];
  bnbPriceHistory: IPrice[] = [];
  ethPriceHistory: IPrice[] = [];
  btcPriceHistory: IPrice[] = [];

  private tradeColumnOptions: string[] = [
    'asset',
    'order_id',
    'date',
    'side',
    'unit_price',
    'qty',
    'amount_paid',
    'fee',
    'currency_pair',
  ];

  constructor(
    private fileService: FileService
  ) {

    const arrHead = ['asset','order_id', 'date', 'side', 'unit_price', 'qty', 'amount_paid','fee', 'currency_pair' ];
    this.localTradeRecords.push(
      new LocalTrade('2022-04-02 10:24:03', '6247b3c2d332c0000176aee6','BNB-USDT', 'buy', 452.375, 0.17724318,80.1803835525,0.0801803835525,'USDT'));
    this.localTradeRecords.push(
      new LocalTrade('2022-04-02 10:24:03', '6247b3c2d332c0000176aee6', 'BNB-USDT', 'buy', 452.369, 0.1815, 82.1049735, 0.0821049735,'USDT'));
    this.localTradeRecords.push(
      new LocalTrade( '2022-04-02 10:24:03', '6247b3c2d332c0000176aee6', 'BNB-USDT', 'buy', 452.369,0.1815, 82.1049735, 0.0821049735,'USDT'));

    // console.log(this.localTradeRecords)
    for (let i = 0; i < arrHead.length; i++) {
      this.localHeaderFields.push(new Header(arrHead[i], i + 1));
    }

    this.initApiHeaderFields();
    this.initPriceFields();
    this.initBnbPrice('../../assets/bnb_price_history.csv');

  }

  private initApiHeaderFields(): void {
    const apiTrade = new ApiTradeRecord( '','','','','','','','','','', '','','','');
    for (const propertyName in apiTrade) {
      this.apiHeaderFields.push(propertyName);
    }
  }

  private initPriceFields(): void {
    const apiTrade = new Bnb('','','','','');
    for (const propertyName in apiTrade) {
      this.apiHeaderFields.push(propertyName);
    }
  }

  private initBnbPrice(filePath: string) : void {
    this.fileService.getBnbPriceFromFile(filePath)
      .then(priceRecords => {
        this.addBnbPriceRecords(priceRecords);
      }).catch(err => console.log(err));
  }


  /////////// Price

  addBnbPriceRecords(priceRecords: string[]) : void {
    priceRecords.shift(); // remove header row
    for (const record of priceRecords) {
      this.bnbPriceHistory.push(new Bnb('BNB', record[0], record[4], record[6], record[5]))
    }
  }

  ///////////////////////////////////////////////////////////

  // coluumn / field options for the select input drop down
  getTradeColumnOptions(): string[] {
    return this.tradeColumnOptions;
  }

  // the unformatted header fields
  getRawHeaderFields(): string[] {
    return this.rawHeaderFields;
  }

  // the unformatted trade records
  getRawTradeRecords(): string[] {
    return this.rawTradeRecords;
  }

  // the local formatted / match header fields
  getLocalHeaderFields(): IHeader[] {
    return this.localHeaderFields;
  }

  // the local formatted trade records
  getLocalTradeRecords(): ITrade[] {
    return this.localTradeRecords;
  }

  // a singe local trade record by index
  getLocalTradeRecordByIndex(index: number): ITrade {
    return this.localTradeRecords[index];
  }

  // trade records received from an api endpoint
  getTradeRecords(): ITrade[] | null {
    // todo http
    return [];
  }

  // trade records by its id; recieved from an api endpoint
  getTradeRecordById(id: number): ITrade | null {
    // todo http
    return null;
  }

  // adds one raw trade reccord to local class member
  addRawTradeRecord(rawTradeRecord: string): void {
    this.rawTradeRecords.push(rawTradeRecord);
  }

  // saves an array of raw trade records
  saveRawTradeRecords(rawTradeRecords: string[]): void {
    this.rawTradeRecords = rawTradeRecords;
  }

  // saves a string of raw header fields
  concatRawHeaderFields(rawHeaderFields: string): void {
    this.rawHeaderFields = [];
    this.rawHeaderFields = this.rawHeaderFields.concat(rawHeaderFields);
  }

  // saves a string of raw header fields
  saveRawHeaderFields(rawHeaderFields: string[]): void {
    this.rawHeaderFields = [];
    for (const field of rawHeaderFields) {
      this.rawHeaderFields.push(field);
    }
  }

  saveLocalHeaderFields(headerFields: IHeader[]): void {
    this.localHeaderFields = headerFields;
  }

  saveLocalTradeRecords(tradeRecords: ITrade[]): void {
    this.localTradeRecords = tradeRecords;
  }

  //=========== for local trade records ===============//

  // clear the local header fields array
  clearLocalHeaderFields(): void {
    this.localHeaderFields = [];
  }

  // clear the local trade record array
  clearLocalTradeRecords(): void {
    this.localTradeRecords = [];
  }

  // add one local header field to local member variable
  addLocalHeaderField(headerField: IHeader): void {
    this.localHeaderFields.push(headerField);
  }

  // add one local trade record to the local member variable
  addLocalTradeRecord(localTradeRecord: ITrade): void {
    this.localTradeRecords.push(localTradeRecord);
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
    idx: number
  ): ITrade {
    console.log(idx);
    this.localTradeRecords[idx].asset = asset;
    this.localTradeRecords[idx].orderId = orderId;
    this.localTradeRecords[idx].date = date;
    this.localTradeRecords[idx].side = side;
    this.localTradeRecords[idx].unitPrice = unitPrice;
    this.localTradeRecords[idx].qty = qty;
    this.localTradeRecords[idx].amountPaid = amountPaid;
    this.localTradeRecords[idx].fee = fee;
    this.localTradeRecords[idx].currencyPair = currencyPair;

    console.log(this.localTradeRecords[idx]);
    return this.localTradeRecords[idx + 1];
  }

  updateLocalTradeRecord(tradeRecord: ITrade): ITrade {
    const idx = tradeRecord.index ?? 0;
    this.localTradeRecords[idx] = tradeRecord;
    return this.localTradeRecords[idx];
  }

  deleteLocalTradeRecord(index: number): ITrade[] {
    this.localTradeRecords.splice(index, 1);
    return this.localTradeRecords;
  }

  //============ FOR HTTP ==============//

  saveTradeRecords(tradeRecords: ITrade[]): void {
    // todo http
  }

  updateTradeRecord(tradeRecord: ITrade): void {
    // todo http
  }

  deleteTradeRecord(tradeRecord: ITrade): void {
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
