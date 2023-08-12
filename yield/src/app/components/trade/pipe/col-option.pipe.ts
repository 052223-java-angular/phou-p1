import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colOption'
})
export class ColOptionPipe implements PipeTransform {

  transform(colCount: number, orderedColOptions: string[]): string[] {

    for (let i = 0; i < colCount; i++) {
      if (!orderedColOptions.includes(orderedColOptions[i])) {
        orderedColOptions.push("");
      }
    }

    return orderedColOptions;
  }

}
