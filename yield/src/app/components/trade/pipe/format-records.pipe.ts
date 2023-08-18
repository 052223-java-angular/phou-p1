import { Pipe, PipeTransform } from '@angular/core';
import { IHeaderField } from '../model/HeaderField';
import { ITradeRecord } from '../model/TradeRecord';

@Pipe({
  name: 'formatRecords'
})
export class FormatRecordsPipe implements PipeTransform {

  transform(record: ITradeRecord, curColumnIndex: number, headerFields: IHeaderField[]): string {
    
    const columnSlot: number = record.fieldOrder[curColumnIndex];
    const hField: IHeaderField | undefined = headerFields.find(field => field.fieldOrderIndex === columnSlot);

    if (hField) {

      const hFieldPart: string[] = hField.fieldName.split("_");
      // format the field property name
      let hFieldName = hFieldPart[0];

      // capitalize and format length > 0
      hFieldPart.forEach((fieldPart, i) => {
        if (i > 0)
          hFieldName += fieldPart.charAt(0).toUpperCase() + fieldPart.slice(1);
      })

      return record[hFieldName] as string;
    } 

    return '';
  }

}
