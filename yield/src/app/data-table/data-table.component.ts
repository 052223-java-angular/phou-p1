import { Component, Input, OnInit, AfterContentChecked, Output, EventEmitter } from '@angular/core';
import { FileService } from '../services/file.service';
import { ITrade, Trade } from '../models/Trade';
import { Header, IHeader } from '../models/Header';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, AfterContentChecked {

  // for edit modal
  showModal: boolean = false;
  tradeRecord!: ITrade;

  // for showing trade records
  tradeRecords: ITrade[] = [];
  headerRow: IHeader[] = [];
  tempRecords: string[] = [];
  tempHeader: string[] = [];

  // for showing table
  @Input() showDataTable: boolean = false;

  constructor(
    private fileService: FileService,
    private http: HttpClient
    ) { }

  ngOnInit(): void {
    this.http.get('/assets/sample.csv', {responseType: 'text'}).subscribe({
      next: (res: any) => {
        this.fileService.loadFromText(res);
      },
      error: (error) => { console.log(error.message)},
      complete: () => {console.log("done loading")}
    })
  }

  ngAfterContentChecked(): void {
    this.headerRow = this.fileService.getTradeHeaderFields();
    this.tradeRecords = this.fileService.getTradeRecords().slice(1,20);
    // this.tempHeader = this.fileService.getTradeColumnOptions();
    // this.tempRecords = this.fileService.getRawRecords().slice(1,20);
    // need to add extra column for checkbox
    // this.headerRow.unshift(new Header("", 0));
    // this.translateRecords(this.tempRecords, this.tempHeader);
  }

  private translateRecords(records: string[], header: string[]) : void {
      let tradeRecord = new Trade();

      for (let record of records) {

        let headerIdx = 0;
        for (let value of record) {
          const colName = header[headerIdx];
    
          switch (colName) {
            case 'asset':
              tradeRecord.asset = value; break;
            case 'order_id':
              tradeRecord.orderId = value; break;
            case 'date':
              tradeRecord.date = value; break;
            case 'side':
              tradeRecord.side = value; break;
            case 'unit_price':
              tradeRecord.unitPrice = Number.parseFloat(value); break;
            case 'qty':
              tradeRecord.qty = Number.parseFloat(value); break;
            case 'amount_paid':
              tradeRecord.amountPaid = Number.parseFloat(value); break;
            case 'fee':
              tradeRecord.fee = Number.parseFloat(value); break;
            case 'currency_pair':
              tradeRecord.currencyPair = value; break;
            default:
              break;
          }
        } 
      }
      this.tradeRecords.push(tradeRecord);
  }

  editTrade(index: number, tradeRecord: Trade) {
    this.tradeRecord = tradeRecord;
    this.showModal = !this.showModal;
  }

  // toggleEditModal(index: number) {
  //   this.showModal = !this.showModal;

  // }

  // cancelEdit() {
  //   this.showModal = !this.showModal;
  // }

  // updateTradeRecord() {
  //   this.showModal = !this.showModal;
  // }

}
