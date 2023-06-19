import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { HttpClient } from '@angular/common/http';
import { TradeRecordService } from './trade-record.service';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private papa: Papa,
    private tradeRecordService: TradeRecordService,
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

  // method for parsing file
  parseCsvFile(file: File) : void {
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

  // save raw records
  private saveRawRecords(rawRecords: string[]) : void {
    // find the max column span // todo - assess for removal; should reject file instead
    const maxColSpan = this.findMaxColSpan(rawRecords);

    let isFirstEqualRow = true;
    for (const row of rawRecords) {
      if (row.length === maxColSpan) {
        // extract first valid row as the header
        if (isFirstEqualRow) {
          this.tradeRecordService.saveRawHeaderFields(row);
          isFirstEqualRow = false;
          continue;
        }
        this.tradeRecordService.addRawTradeRecord(row);
      }
    }
  }

}
