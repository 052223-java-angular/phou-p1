import { Component, Input, OnInit, AfterContentChecked, AfterViewChecked, EventEmitter, Output } from '@angular/core';
import { IColumnPair } from '../models/IColumnPair';
import { FileService } from '../services/file.service';
import { IColumn } from '../models/IColumn';

@Component({
  selector: 'app-data-select-table',
  templateUrl: './data-select-table.component.html',
  styleUrls: ['./data-select-table.component.css']
})
export class DataSelectTableComponent implements OnInit, AfterContentChecked, AfterViewChecked {
  // @Input() showSelectDataTable: boolean = false;
  @Input() selectOptionError: boolean = false;
  @Input() showTableSubmitError: boolean = false;
  @Input() showTable: boolean = false;

  @Output() showTableChange = new EventEmitter<boolean>();

  tableColumnsPerRow: string[] = [];
  tradeColumnOption: string[] = []; 
  tradeColumnValues: string[] = [];
 
  columnPairs: IColumnPair[] = [];
  selectedOption: string = '';

  constructor(
    private fileService: FileService
  ) { }

  ngOnInit(): void { }

  // require hook for detecting content changes after load
  ngAfterContentChecked(): void {
    this.tradeColumnOption = this.fileService.getTradeColumnOptions();
    this.tableColumnsPerRow= this.fileService.getHeaderFields();
    this.tradeColumnValues = this.fileService.getFileData().map(e => e).slice(0, 5);
   }

   ngAfterViewChecked(): void {

   }

   // todo 
   submitSelectedOptions() {
    // when all data lengths are equal, hide this table
    if (this.columnPairs.length === this.tradeColumnOption.length) {
        // this.showSelectDataTable = false;
        this.showTableChange.emit(true);
        console.log("Hiding select table");
      } else {
        this.showTableSubmitError = true;
        return;
      }

      // then pass / output the value ito the parent in order to complete the trade table rendering
      this.fileService.saveFileHeaderFields(this.columnPairs);
   }


   // todo refactor this method - if time permits
   // todo more validation selected type if of correct type, e.g. number is number, date is date, etc.
  setColumnPair(event: any, columnSlot: number, columnName: string) : void {
    this.showTableSubmitError = false;

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
