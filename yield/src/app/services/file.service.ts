import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { TradeRecordService } from './trade-record.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private papa: Papa,
    // private tradeRecordService: TradeRecordService,
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

  // public method for parsing file
  async parseCsvFile(file: File) : Promise<string[]> {
    return await this.papaParse(file);
  }

  getBnbPriceFromFile(filePath: string): void {
    this.httpClient.get(filePath, { responseType: 'text'})
      .subscribe((resTxt: string) => {
        return this.parseHttpResText(resTxt)
      })
  }
  
  private parseHttpResText(resTxt: string) : void {
    this.papa.parse(resTxt, {
      header: false,
      skipEmptyLines: true,
      complete: (result) => {
        // remove all of the empty fields
        const filteredRecords = this.filterRawRecords(result.data);
        for (const row of filteredRecords) {
          // this.tradeRecordService.addPriceRecord(row);
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }


  private papaParse(file: any): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      this.papa.parse(file, {
        header: false,
        skipEmptyLines: true,
        complete: (result) => {
          const rawTradeRecordsWithHeader = this.filterRawRecords(result.data);
          resolve(rawTradeRecordsWithHeader);
        },
        error: (error) => {
          console.log(error);
          reject(error);
        }
      });
    });
  }


  // save raw records
  private addRawRecords(rawRecords: string[]) : string[] {
    // find the max column span // todo - assess for removal; should reject file instead
    const maxColSpan = this.findMaxColSpan(rawRecords);
    const rawTradeRecordsWithHeader: string[] = []

    let isFirstEqualRow = true;
    for (const row of rawRecords) {
      if (row.length === maxColSpan) {
        // extract first valid row as the header
        if (isFirstEqualRow) {
          // this.tradeRecordService.saveRawHeaderFields(row);
          rawTradeRecordsWithHeader.push(row);
          isFirstEqualRow = false;
          continue;
        }
        // this.tradeRecordService.addRawTradeRecord(row);
        rawTradeRecordsWithHeader.push(row)
      }
    }
    return rawTradeRecordsWithHeader;
  }

}
