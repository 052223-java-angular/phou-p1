import { Component, Input, AfterContentChecked, EventEmitter, Output } from '@angular/core';
import { ISelectOption, SelectOption } from '../models/SelectOption';
import { FileService } from '../services/file.service';
import { ITrade, Trade } from '../models/Trade';
import { Header, IHeader } from '../models/Header';

@Component({
  selector: 'app-data-select-table',
  templateUrl: './data-select-table.component.html',
  styleUrls: ['./data-select-table.component.css']
})
export class DataSelectTableComponent implements AfterContentChecked {

  // for table changes
  @Input() showTable: boolean = false;
  @Output() showTableChange = new EventEmitter<boolean>();

  // local error
  optionError: boolean = false;
  submitError: boolean = false;
  submitErrorMessage: string = '';

  // for raw data
  rawHeaderFields: string[] = [];
  rawSelectOptions: string[] = []; 
  rawTradeRecords: string[] = [];

  // for filtered data
  tradeRecords: ITrade[] = [];
  headerFields: IHeader[] = [];
 
  selectedColumnOptions: ISelectOption[] = [];
  selectedOption: string = '';

  constructor(
    private fileService: FileService
  ) { }

  // require hook for detecting content changes after load
  ngAfterContentChecked(): void {
    this.rawSelectOptions = this.fileService.getTradeColumnOptions();
    this.rawHeaderFields= this.fileService.getRawHeaderFields();
    this.rawTradeRecords = this.fileService.getRawRecords().map(e => e).slice(0, 2);
   }


   private setSubmitError() : void {
    this.submitError = !this.submitError;
    this.submitErrorMessage = `${this.selectedColumnOptions.length} identifiers 
    of ${this.rawSelectOptions.length} must be selected before submitting!`;
    setTimeout(() => {
      this.submitError = false;
    }, 3000)
   }

   // for validating the selected option matches available
   private hasValidSelection() : boolean {
      if (this.selectedColumnOptions.length === this.rawSelectOptions.length) {
        return true;
      }
      return false;
   }

   // for creating a trade record
   private createTradeRecord(record: string) : ITrade {
    let tradeRecord = new Trade();

    for (let option of this.selectedColumnOptions) {
      const colName = option.name;

      switch (colName) {
        case 'asset':
          tradeRecord.asset = record[option.slot]; break;
        case 'order_id':
          tradeRecord.orderId = record[option.slot]; break;
        case 'date':
          tradeRecord.date = record[option.slot]; break;
        case 'side':
          tradeRecord.side = record[option.slot]; break;
        case 'unit_price':
          tradeRecord.unitPrice = Number.parseFloat(record[option.slot]); break;
        case 'qty':
          tradeRecord.qty = Number.parseFloat(record[option.slot]); break;
        case 'amount_paid':
          tradeRecord.amountPaid = Number.parseFloat(record[option.slot]); break;
        case 'fee':
          tradeRecord.fee = Number.parseFloat(record[option.slot]); break;
        case 'currency_pair':
          tradeRecord.currencyPair = record[option.slot]; break;
        default:
          break;
      }
    } 
    return tradeRecord;
   }

   // for adding trade record header fields
   private addHeaderFields() : void {
    for (let option of this.selectedColumnOptions) {
      this.headerFields.push(new Header(option.name, option.slot));
    }
   }

   // for submitting the selected options
   submitSelectedOptions() : void {

    if (!this.hasValidSelection()) {
      this.setSubmitError();
      return;
    }

      const records = this.fileService.getRawRecords();
      let includeHeader = true;
      for (const element of records) {
        if (includeHeader) {
          this.addHeaderFields();
          includeHeader = false;
          continue;
        }
        this.tradeRecords.push(this.createTradeRecord(element));
      }

      // perform calculation, add column or send to  backend for processing
      // consolidate pairs, create oject by date


      // then pass / output the value ito the parent in order to complete the trade table rendering
      this.fileService.saveTradeRecords(this.tradeRecords);
      this.fileService.saveTradeHeaderFields(this.headerFields);
      // emit change and ssign column data 
      this.showTableChange.emit(true);
   }

   // sets selected options and throws error when duplicate is found
  setSelectedOption(event: any, cIndex: number, cName: string) : void {
    this.submitError = false;
    this.optionError = false;

    // find the existing pair if it exists
    let foundPair;
    if (this.selectedColumnOptions.length > 0) {
      for (let pair of this.selectedColumnOptions) {
        if (pair.slot === cIndex) {
          foundPair = pair;
        }
      }
    }

    // add new item when not found, else update
    if (foundPair === undefined) {
      const foundColumnNames = this.selectedColumnOptions.filter(ele => ele.name === cName);
      if (foundColumnNames.length === 0) {
        this.selectedColumnOptions.push({slot: cIndex, name: cName})
        this.optionError = false;
      } else {
        this.optionError = !this.optionError;
        event.target.value = "";
      }
    } else {
      // check if another column has the column name
      const foundColumnNames = this.selectedColumnOptions.filter(ele => ele.name === cName);
      if (foundColumnNames.length === 0) {
        foundPair.slot = cIndex;
        foundPair.name = cName;
        this.optionError = false;
      } else {
        // throw error or set value
        this.optionError = !this.optionError;
        event.target.value = foundPair.name;
      }
    }
  }

}
