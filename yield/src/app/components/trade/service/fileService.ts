import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable()
export class FileService {
  constructor(private papa: Papa) {}

  parseCsvFile(file: File) : Observable<string[]> {
    return this.papaParseCsv(file);
  }

  private papaParseCsv(file: File) : Observable<string[]> {
    return new Observable<string[]>(observer => {
      this.papa.parse(file, {
        header: false,
        skipEmptyLines: true,
        complete: (result : any) => {
          const filteredRecords = this.filterRawRecords(result.data);
          const formattedRecords = this.formatRawRecords(filteredRecords);
          observer.next(formattedRecords);
          observer.complete();
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
    const len = records.length < 20 ? records.length : 20;
    for (let i = 0; i < len; i++) {
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
