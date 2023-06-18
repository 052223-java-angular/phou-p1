import { Component, Input, OnInit, AfterContentChecked } from '@angular/core';
import { FileService } from '../services/file.service';
import { ITrade } from '../models/Trade';
import { IHeader } from '../models/Header';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, AfterContentChecked {
  showModal: boolean = false;
  tradeRecords: ITrade[] = [];
  headerRow: IHeader[] = [];
  tradeColumnHeader: string[] = []; // ['asset_pair', 'asset_pair_value', 'bought_date', 'bought_qty', 'bought_value', 'bought_fee', 'sold_date', 'sold_qty', 'sold_value', 'sold_fee'];
  tradeColumnValues: string[][] = []; // ['ada/usd', '1.00', '05-30-2022', '832', '832.0832', '0.0832', '05-31-2022', '832', '862.32', '0.0832', '30.32'];
  @Input() showDataTable: boolean = false;

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  ngAfterContentChecked(): void {
    // this.tradeColumnHeader= this.fileService.getHeaderFields();
    this.headerRow = this.fileService.getTradeHeaderFields();
    this.tradeRecords = this.fileService.getTradeRecords().slice(1,20);
    // need to add extra column for checkbox
    this.tradeColumnHeader.unshift("");
    console.log(this.headerRow);
    // this.tradeColumnValues = this.fileService.getFile2D().slice(1, 50);
  }

  toggleEditModal(index: number) {
    this.showModal = !this.showModal;
  }

}
