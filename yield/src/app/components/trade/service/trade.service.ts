import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TradeService {
  constructor() { }
  
  tradeRecords: BehaviorSubject<string[]> = new BehaviorSubject(['']);
  filteredHeaderFields: BehaviorSubject<string[]> = new BehaviorSubject(['']);
  filteredTradeRecords: BehaviorSubject<string[]> = new BehaviorSubject(['']);

  tradeRecordRow: BehaviorSubject<string> = new BehaviorSubject('');
  headerFields: BehaviorSubject<string> = new BehaviorSubject("");
  headerFieldColCount: BehaviorSubject<number> = new BehaviorSubject(0);

  raiseTradeRecordsChange(records: string[]) : void {
    this.tradeRecords.next(records);
  }

  raiseFilteredHeaderFieldChange(fields: string[]) {
    const indexToSkip: number[] = [];
    for (let i = 0; i < fields.length; i++) {
      if (fields[i] === "") {
        indexToSkip.push(i);
      }
    }

    const filteredTradeRecords: string[] = [];
    for (let i = 0; i < this.tradeRecords.value.length; i++) {
      const record = this.tradeRecords.value[i];
      let recordStr = "";
      for (let k = 0; k < record.length; k++) {
        if (indexToSkip.indexOf(k) == -1) {
          recordStr += "," + record[k];
        }
      }
      filteredTradeRecords.push(recordStr.substring(1));
    }

    fields = fields.filter(el => el !== "");
    this.filteredHeaderFields.next(fields);
    this.filteredTradeRecords.next(filteredTradeRecords);
  }

  raiseTradeRecordRowChange(record: string) : void {
    this.tradeRecordRow.next(record);
  }

  raiseHeaderRowChange(fields: string) : void {
    this.headerFields.next(fields);
  }

  raiseHeaderFieldColCountChange(value: number) : void {
    this.headerFieldColCount.next(value);
  }

}
