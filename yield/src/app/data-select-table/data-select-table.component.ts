import { Component, Input, OnInit, AfterContentChecked, EventEmitter, Output } from '@angular/core';
import { IColumnPair } from '../models/IColumnPair';
import { FileService } from '../services/file.service';
import { ITrade, Trade } from '../models/Trade';
import { Header, IHeader } from '../models/Header';

@Component({
  selector: 'app-data-select-table',
  templateUrl: './data-select-table.component.html',
  styleUrls: ['./data-select-table.component.css']
})
export class DataSelectTableComponent implements OnInit, AfterContentChecked {
  // @Input() showSelectDataTable: boolean = false;
  @Input() selectOptionError: boolean = false;
  @Input() showTableSubmitError: boolean = false;
  @Input() showTable: boolean = false;
  // componentId: string = 'data-select-table';

  @Output() showTableChange = new EventEmitter<boolean>();

  tableColumnsPerRow: string[] = [];
  tradeColumnOption: string[] = []; 
  tradeColumnValues: string[] = [];
  reassignedColumnValues: string[][] = [];
  tradeRecords: ITrade[] = [];
  headerRow: IHeader[] = [];
 
  columnPairs: IColumnPair[] = [];
  selectedOption: string = '';

  constructor(
    private fileService: FileService
  ) { }

  ngOnInit(): void {}

  // require hook for detecting content changes after load
  ngAfterContentChecked(): void {
    this.tradeColumnOption = this.fileService.getTradeColumnOptions();
    this.tableColumnsPerRow= this.fileService.getRawHeaderFields();
    this.tradeColumnValues = this.fileService.getRawRecords().map(e => e).slice(0, 2);
   }

   submitSelectedOptions() {
      // when all data lengths are equal, hide this table
      if (this.columnPairs.length !== this.tradeColumnOption.length) {
          this.showTableSubmitError = true;
          return;
      }

      // emit change and ssign column data 
      this.showTableChange.emit(true);

      const data = this.fileService.getRawRecords();
      let isRequireHeader = true;
      for (const element of data) {

        let rowData = element;
        let colValues = [];

        let trade = new Trade();
        for (let pair of this.columnPairs) {
          const colName = pair.columnName;

          // run for 1 iteration
          if (isRequireHeader) {
            this.headerRow.push(new Header(pair.columnName, pair.columnSlot));
          }

          switch (colName) {
            case 'asset':
              trade.asset = rowData[pair.columnSlot]; break;
            case 'order_id':
              trade.orderId = rowData[pair.columnSlot]; break;
            case 'date':
              trade.date = rowData[pair.columnSlot]; break;
            case 'side':
              trade.side = rowData[pair.columnSlot]; break;
            case 'unit_price':
              trade.unitPrice = Number.parseFloat(rowData[pair.columnSlot]); break;
            case 'qty':
              trade.qty = Number.parseFloat(rowData[pair.columnSlot]); break;
            case 'amount_paid':
              trade.amountPaid = Number.parseFloat(rowData[pair.columnSlot]); break;
            case 'fee':
              trade.fee = Number.parseFloat(rowData[pair.columnSlot]); break;
            case 'currency_pair':
              trade.currencyPair = rowData[pair.columnSlot]; break;
            default:
              break;

          }
          
          colValues.push(rowData[pair.columnSlot]);
        } 
        
        isRequireHeader = false;
        this.tradeRecords.push(trade);       
        this.reassignedColumnValues.push(colValues);
      }

      // perform calculation, add column or send to  backend for processing
      // consolidate pairs, create oject by date


      // then pass / output the value ito the parent in order to complete the trade table rendering
      this.fileService.saveTradeRecords(this.tradeRecords);
      this.fileService.saveTradeHeaderFields(this.headerRow);
      // this.fileService.saveOrganizedFileData(this.reassignedColumnValues);
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
