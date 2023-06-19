import { Component, Input, OnInit, AfterContentChecked } from '@angular/core';
import { FileService } from '../services/file.service';
import { ITrade, Trade } from '../models/Trade';
import { Header, IHeader } from '../models/Header';


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
    private fileService: FileService
    ) { }

  ngOnInit(): void {

    // temp for development
    if (!this.showDataTable) {
      let arrHead = ['asset', 'order_id', 'date', 'side', 'unit_price', 'qty', 'amount_paid', 'fee', 'currency_pair']
      this.tradeRecords.push(new Trade('2022-04-02 10:24:03','6247b3c2d332c0000176aee6','BNB-USDT','buy',452.375,0.17724318,80.1803835525,0.0801803835525,'USDT'))
      this.tradeRecords.push(new Trade('2022-04-02 10:24:03','6247b3c2d332c0000176aee6','BNB-USDT','buy',452.369,0.1815,82.1049735,0.0821049735,'USDT'),)
      
      for (let i = 0; i < arrHead.length; i++) {
        this.headerRow.push(new Header(arrHead[i], i+1));
      }
    }
    
  }

  ngAfterContentChecked(): void {

    // temp, for development
    if (this.showDataTable) {
      this.headerRow = this.fileService.getTradeHeaderFields();
      this.tradeRecords = this.fileService.getTradeRecords().slice(1,20);
    }
  }

  editTrade(index: number, tradeRecord: Trade) {
    this.tradeRecord = tradeRecord;
    this.showModal = !this.showModal;
  }


  deleteTrade(index: number, tradeRecord: Trade) {
    this.tradeRecords.splice(index, 1);
    console.log('Deleting record ...')
  }

}
