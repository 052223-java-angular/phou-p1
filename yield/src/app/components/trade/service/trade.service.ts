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

  raiseTradeRecordsChange(records: string[]) : void {
    this.tradeRecords.next(records);
  }

  raiseFilteredHeaderFieldChange(hFields: string[]) {

    const emptyIndexSet = new Set<number>();
    const hFieldCopy = hFields.slice(); // Create a copy to avoid modifying original
    const filteredRecords: ITradeRecord[] = [];


    hFieldCopy.forEach((field, index) => {
      if (field === "") {
        emptyIndexSet.add(index);
      }
    });
    
    this.tradeRecords.value.forEach(recordArray => {
      const tRecord = new TradeRecord();
      tRecord.fieldOrder = [];
      const record: any = recordArray;

      record.forEach((value: string, i: number) => {
        if (!emptyIndexSet.has(i)) {
          const activeHeadField = hFieldCopy[i]; // set the current head element

          switch (activeHeadField) {
            case 'asset': tRecord.asset = value; tRecord.fieldOrder.push(i); break;
            case 'order_id': tRecord.orderId = value; tRecord.fieldOrder.push(i); break;
            case 'date': tRecord.date = value; tRecord.fieldOrder.push(i); break;
            case 'side': tRecord.side = value; tRecord.fieldOrder.push(i); break;
            case 'unit_price': tRecord.unitPrice = parseFloat(value); tRecord.fieldOrder.push(i); break;
            case 'qty': tRecord.qty = parseFloat(value); tRecord.fieldOrder.push(i); break;
            case 'amount_paid': tRecord.amountPaid = parseFloat(value); tRecord.fieldOrder.push(i); break;
            case 'fee': tRecord.fee = parseFloat(value); tRecord.fieldOrder.push(i); break;
            case 'currency_pair': tRecord.currencyPair = value; tRecord.fieldOrder.push(i); break;
          }

        }

      })
      filteredRecords.push(tRecord);
    })

    const filteredHeadFields: HeaderField[] = hFieldCopy
      .filter(el => el !== "")
      .map((fieldName, fieldOrderIndex) => ({fieldName, fieldOrderIndex}));

    this.filteredHeaderFields.next(filteredHeadFields);
    this.filteredTradeRecords.next(filteredRecords);
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
