import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITradeRecord, TradeRecord } from '../model/TradeRecord';
import { HeaderField, IHeaderField } from '../model/HeaderField';


@Injectable()
export class TradeService {
  
  tradeRecords: BehaviorSubject<string[]> = new BehaviorSubject(['']);
  filteredHeaderFields: BehaviorSubject<IHeaderField[]> = new BehaviorSubject<IHeaderField[]>([]);
  filteredTradeRecords: BehaviorSubject<ITradeRecord[]> = new BehaviorSubject<ITradeRecord[]>([]);

  tradeRecordRow: BehaviorSubject<string> = new BehaviorSubject('');
  headerFields: BehaviorSubject<string> = new BehaviorSubject("");
  headerFieldColCount: BehaviorSubject<number> = new BehaviorSubject(0);

  raiseEditRecordChange(record: ITradeRecord) : void {

    const updatedRecords = this.filteredTradeRecords.getValue();
    updatedRecords[record.recordId] = record;
    this.filteredTradeRecords.next(updatedRecords);

  }

  raiseTradeRecordsChange(records: string[]) : void {
    this.tradeRecords.next(records);
  }

  raiseFilteredHeaderFieldChange(hFields: string[]) {

    const emptyIndexSet = new Set<number>();
    const filteredRecords: ITradeRecord[] = [];


    hFields.forEach((field, index) => {
      if (field === "") {
        emptyIndexSet.add(index);
      }
    });
    
    this.tradeRecords.value.forEach((recordArray, idx) => {
      const tRecord = new TradeRecord();
      tRecord.fieldOrder = [];
      const record: any = recordArray;

      // RESTART: record.forEach((value: string, i: number) => {
      for (let i = 0; i < record.length; i++) {

        if (!emptyIndexSet.has(i)) {
          const activeHeadField = hFields[i]; // set the current head element
          const value = record[i];

          switch (activeHeadField) {
            case 'asset': 
              tRecord.asset = value; break;
            case 'order_id': 
              tRecord.orderId = value; break;
            case 'date': 
              tRecord.date = value; break;
            case 'side': 
              tRecord.side = value; break;
            case 'unit_price': 
              tRecord.unitPrice = parseFloat(value); break;
            case 'qty': 
              tRecord.qty = parseFloat(value); break;
            case 'amount_paid': 
              tRecord.amountPaid = parseFloat(value); break;
            case 'fee': 
              tRecord.fee = parseFloat(value); break;
            case 'currency_pair': 
              tRecord.currencyPair = value; break;
          }
          tRecord.fieldOrder.push(i);
        }
        else {
          tRecord.fieldOrder.push(-1);
        }
      }
      tRecord.recordId = idx;
      filteredRecords.push(tRecord);
    })

    const filteredHeadFields: HeaderField[] = hFields
      .map((fieldName, fieldOrderIndex) => ({fieldName, fieldOrderIndex}));

    this.filteredHeaderFields.next(filteredHeadFields);
    this.filteredTradeRecords.next(filteredRecords);
  }

  // todo order and pair header and record data using object{ key: type[] }
  orderTradeRecords(tradeRecords: ITradeRecord[], headerFields: IHeaderField[]) : void {}


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
