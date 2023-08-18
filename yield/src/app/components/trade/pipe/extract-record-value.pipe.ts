import { Pipe, PipeTransform } from '@angular/core';
import { ITradeRecord } from '../model/TradeRecord';

@Pipe({
  name: 'extractRecordValue'
})
export class ExtractRecordValuePipe implements PipeTransform {

  transform(record: ITradeRecord, headerFields: string[]): unknown {
    return null;
  }

}
