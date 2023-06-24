import { Component, Input, AfterContentChecked, EventEmitter, Output } from '@angular/core';
import { ISelectOption, SelectOption } from '../models/SelectOption';
import { FileService } from '../services/file.service';
import { ITrade, LocalTrade } from '../models/ITrade';
import { Header, IHeader } from '../models/Header';
import { TradeRecordService } from '../services/trade-record.service';

@Component({
  selector: 'app-data-select-table',
  templateUrl: './data-select-table.component.html',
  styleUrls: ['./data-select-table.component.css']
})
export class DataSelectTableComponent implements AfterContentChecked {

  // for table changes
  @Input() showSelectTable: boolean = false;
  @Input() showTable: boolean = false;
  @Output() showTableChange = new EventEmitter<boolean>();
  @Output() showSelectTableChange = new EventEmitter<boolean>();

  // local error
  optionError: boolean = false;
  submitError: boolean = false;
  submitErrorMessage: string = '';

  // for raw data
  rawHeaderFields: string[] = [];
  rawTradeRecords: string[] = [];
  // selectable options for drop down
  rawSelectOptions: string[] = ['asset','order_id','date','side','unit_price','qty','amount_paid','fee','currency_pair'];

  // for filtered data. for persisting
  tradeRecords: ITrade[] = [];
  headerFields: IHeader[] = [];
 
  // arrays containing the selected select options
  selectedOptionsForColumns: ISelectOption[] = [];
  selectedOption: string = '';





  constructor(
    private tradeRecordService: TradeRecordService
  ) { }


  ngAfterContentChecked(): void {
    this.rawHeaderFields= this.tradeRecordService.getRawHeaderFields();
    this.rawTradeRecords = this.tradeRecordService.getRawTradeRecords().map(e => e).slice(0, 1);
   }


   // for showing errors
   private setSubmitError() : void {
    this.submitError = !this.submitError;
    this.submitErrorMessage = `${this.selectedOptionsForColumns.length} identifiers 
    of ${this.rawSelectOptions.length} must be selected before submitting!`;

    setTimeout(() => {
      this.submitError = false;
    }, 3000)
   }

   // for validating the selected option matches available
   private hasValidSelection() : boolean {
      if (this.selectedOptionsForColumns.length === this.rawSelectOptions.length) {
        return true;
      }
      return false;
   }

   // for creating a trade record
   private createTradeRecord(record: string) : ITrade {
    let tradeRecord = new LocalTrade();

    for (let option of this.selectedOptionsForColumns) {
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

   // for adding Header instances to indentify the column fields
   private addHeaderFields() : void {
    if (this.tradeRecordService.getLocalHeaderFields().length > 0) {
      this.tradeRecordService.clearLocalHeaderFields();
    }

    for (let option of this.selectedOptionsForColumns) {
      this.tradeRecordService.addLocalHeaderField(new Header(option.name, option.slot));
    }
   }

  
   // for submitting the selected o
   submitSelectedOptions() : void {

    if (!this.hasValidSelection()) {
      this.setSubmitError();
      return;
    }

      // retrieve the latest trade records
      const records = this.tradeRecordService.getRawTradeRecords();


      // clear existing local trade records if they exist
      if (this.tradeRecordService.getLocalTradeRecords().length > 0) {
        this.tradeRecordService.clearLocalTradeRecords();
      }

      // add header fields and trade records
      let includeHeader = true;
      for (const element of records) {
        if (includeHeader) {
          this.addHeaderFields();
          includeHeader = false;
          continue;
        }
        this.tradeRecordService.addLocalTradeRecord(this.createTradeRecord(element))
      }

      // emit change and ssign column data 
      this.showSelectTableChange.emit(false);
      this.showTableChange.emit(true);
   }


   // sets selected options or throws error message when duplicate(s) are found
  setSelectedOption(event: any, cIndex: number, cName: string) : void {
    this.submitError = false;
    this.optionError = false;

    // find the existing pair if it exists
    let foundPair;
    if (this.selectedOptionsForColumns.length > 0) {
      for (let pair of this.selectedOptionsForColumns) {
        if (pair.slot === cIndex) {
          foundPair = pair;
        }
      }
    }

    // TODO cleanup; add new item when not found, else update
    if (foundPair === undefined) {
      const foundColumnNames = this.selectedOptionsForColumns.filter(ele => ele.name === cName);
      if (foundColumnNames.length === 0) {
        this.selectedOptionsForColumns.push({slot: cIndex, name: cName})
        this.optionError = false;
      } else {
        this.optionError = !this.optionError;
        event.target.value = "";
      }
    } else {
      // check if another column has the column name
      const foundColumnNames = this.selectedOptionsForColumns.filter(ele => ele.name === cName);
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
