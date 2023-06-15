import { Component, Input, OnInit } from '@angular/core';
import { IColumnPair } from '../models/IColumnPair';

@Component({
  selector: 'app-data-select-table',
  templateUrl: './data-select-table.component.html',
  styleUrls: ['./data-select-table.component.css']
})
export class DataSelectTableComponent implements OnInit {
  @Input() showSelectDataTable: boolean = false;
  @Input() selectOptionError: boolean = false;
  tableColumnsPerRow: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  tradeColumnOption: string[] = ['asset_pair', 'asset_pair_value', 'bought_date', 'bought_qty', 'bought_value', 'bought_fee', 'sold_date', 'sold_qty', 'sold_value', 'sold_fee'];
  tradeColumnValues: string[] = ['ada/usd', '1.00', '05-30-2022', '832', '832.0832', '0.0832', '05-31-2022', '832', '862.32', '0.0832'];
  columnPairs: IColumnPair[] = [];
  selectedOption: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  setColumnPair(event: any, columnSlot: number, columnName: string) : void {
    // let columnPair: IColumnPair = {columnSlot: columnSlot, columnName: columnName}

    // find the existing pair if it exists
    let foundPair;
    if (this.columnPairs.length > 0) {
      for (let pair of this.columnPairs) {
        if (pair.columnSlot === columnSlot) {
          foundPair = pair;
        }
      }
    }

    // add new item when not found, else update
    if (foundPair === undefined) {
      const foundColumnNames = this.columnPairs.filter(ele => ele.columnName === columnName);
      if (foundColumnNames.length === 0) {
        this.columnPairs.push({columnSlot: columnSlot, columnName: columnName})
        this.selectOptionError = false;
      } else {
        this.selectOptionError = !this.selectOptionError;
        event.target.value = "";
      }

    } else {
      // check if another column has the column name
      const foundColumnNames = this.columnPairs.filter(ele => ele.columnName === columnName);

      if (foundColumnNames.length === 0) {
        foundPair.columnSlot = columnSlot;
        foundPair.columnName = columnName;
        this.selectOptionError = false;
      } else {
        // throw error or set value
        this.selectOptionError = !this.selectOptionError;
        event.target.value = foundPair.columnName;
      }
    }

    // console.log(columnPair)
    console.log(this.columnPairs);
  }

}
