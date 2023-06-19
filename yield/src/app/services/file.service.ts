import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { ITrade } from '../models/Trade';
import { IHeader } from '../models/Header';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FileService {
  // for raw data rawRecords
  private rawRecords: string[] = [];
  private rawHeaderFields: string[] = [];
  private tradeColumnOptions: string[] = ['asset', 'order_id', 'date', 'side', 'unit_price', 'qty', 'amount_paid', 'fee', 'currency_pair'];
  
  // for filtered rawRecords
  private tradeRecords: ITrade[] = [];
  private tradeHeaderFields: IHeader[] = [];

  constructor(
    private papa: Papa,
    private httpClient: HttpClient
  ) {}

  private filterRawRecords(records: string[]) : string[] {
    return records.map((row: any) => row.filter((field: any) => field.trim() !== ''));
  }

  private findMaxColSpan(records: string[]) : number {
    let maxColSpan = 0;
    for (let i = 0; i < 20; i++) {
      if (records[i].length > maxColSpan) {
        maxColSpan = records[i].length;
      }
    }
    return maxColSpan;
  }

  // not working with the return file type
  // getRecordsFromAssetsDir() : any {
  //   return this.httpClient.get('/assets/sample.csv', {responseType: 'arraybuffer'}).subscribe({
  //     next: (res) => {
  //       return res;
  //     },
  //     error: (err) => console.log(err.message),
  //     complete: () => console.log("complete ...")
  //   })
  // }

  // parseFromResponse(file: any) {
  //   this.papaParse(file); 
  // }

  // method for parsing file
  parseCsvFile(file: File) : void {
    this.rawHeaderFields = [];
    this.rawRecords = [];
    this.papaParse(file);
  }
  

  private papaParse(file: any) {
    this.papa.parse(file, {
      header: false,
      skipEmptyLines: true,
      complete: (result) => {
        // remove all of the empty fields
        this.saveRawRecords(this.filterRawRecords(result.data));
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getRawRecords() : string[] {
    return this.rawRecords;
  }

  getRawHeaderFields() : string[] {
    return this.rawHeaderFields;
  }

  getTradeHeaderFields() : IHeader[] {
    return this.tradeHeaderFields;
  }

  getTradeColumnOptions() : string[] {
    return this.tradeColumnOptions;
  }

  getTradeRecords() : ITrade[] {
    return this.tradeRecords;
  }

  // 
  saveTradeHeaderFields(tradeHeaderFields: IHeader[]) : void {
    this.tradeHeaderFields = [];
    this.tradeHeaderFields = tradeHeaderFields;
  }

  saveTradeRecords(tradeRecords: ITrade[]) : void {
    this.tradeRecords = [];
    this.tradeRecords = tradeRecords;
  }

  // save the header field of the file
  private saveRawHeader(rawHeaderFields: string) : void {
    this.rawHeaderFields = [];
    this.rawHeaderFields = this.rawHeaderFields.concat(rawHeaderFields);
  }

  // save raw records
  private saveRawRecords(rawRecords: string[]) : void {
    // find the max column span // todo - assess for removal; should reject file instead
    const maxColSpan = this.findMaxColSpan(rawRecords);

    let isFirstEqualRow = true;
    for (const row of rawRecords) {
      if (row.length === maxColSpan) {
        // extract first valid row as the header
        if (isFirstEqualRow) {
          this.saveRawHeader(row);
          isFirstEqualRow = false;
          continue;
        }
        this.rawRecords.push(row); 
      }
    }
  }

}
