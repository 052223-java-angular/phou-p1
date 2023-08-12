import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatRecords'
})
export class FormatRecordsPipe implements PipeTransform {

  transform(record: string): string[] {

    const formattedRecords: string[] = [];
    for (let value of record.split(",")) {
      formattedRecords.push(value);
    }

    return formattedRecords;
  }

}
