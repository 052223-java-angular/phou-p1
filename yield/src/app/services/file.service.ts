import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { TradeRecordService } from './trade-record.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private papa: Papa,
    private httpClient: HttpClient
  ) {}


  // public method for parsing file
  async parseCsvFile(file: File) : Promise<string[]> {
    return await this.papaParse(file);
  }


  getBnbPriceFromFile(filePath: string): Promise<string[]> {
    // return new Promise<string[]>((resolve, reject) => {
      return new Promise<string[]>((resolve, reject) => {
        this.httpClient.get(filePath, { responseType: 'text' })
          .subscribe((resTxt: string) => {
            this.parseHttpResText(resTxt)
              .then((priceRecords: string[]) => {
                resolve(priceRecords)
              })
              .catch(err => {
                reject(err);
              })
            }, (error) => {
              reject(error);
            });
        });
  }

  //============== PRIVATE METHODS
  
  private parseHttpResText(resTxt: string) : Promise<string[]> {
    return new Promise<string[]>((resolve) => {
      this.papa.parse(resTxt, {
        header: false,
        skipEmptyLines: true,
        complete: (result) => {
          const filteredRecords = this.filterRawRecords(result.data);
          resolve(this.formatRawRecords(filteredRecords));
        }
      })
    })
  }


  private papaParse(file: any): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      this.papa.parse(file, {
        header: false,
        skipEmptyLines: true,
        complete: (result) => {
          const filteredRecords = this.filterRawRecords(result.data);
          resolve(this.formatRawRecords(filteredRecords));
        },
        error: (error) => {
          console.log(error);
          reject(error);
        }
      });
    });
  }

  //==============  HELPER METHODS


  // for cleaning up any empty data columns
  private filterRawRecords(records: string[]) : string[] {
    return records.map((row: any) => row.filter((field: any) => field.trim() !== ''));
  }


  // for getting the max col span of the first 20 rows
  private findMaxColSpan(records: string[]) : number {
    let maxColSpan = 0;
    for (let i = 0; i < 20; i++) {
      if (records[i].length > maxColSpan) {
        maxColSpan = records[i].length;
      }
    }
    return maxColSpan;
  }


  // save raw records
  private formatRawRecords(rawRecords: string[]) : string[] {
    // find the max column span // todo - assess for removal; should reject file instead
    const maxColSpan = this.findMaxColSpan(rawRecords);
    const rawTradeRecordsWithHeader: string[] = []

    let isFirstEqualRow = true;
    for (const row of rawRecords) {

      // maxcol check is used for files in which the header does not begin at n-row
      if (row.length === maxColSpan) {
        if (isFirstEqualRow) {
          rawTradeRecordsWithHeader.push(row);
          isFirstEqualRow = false;
          continue;
        }
        rawTradeRecordsWithHeader.push(row)
      }
    }
    return rawTradeRecordsWithHeader;
  }

}
