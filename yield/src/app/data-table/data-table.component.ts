import { Component, Input, OnInit, AfterContentChecked } from '@angular/core';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, AfterContentChecked {
  showModal: boolean = false;
  // tableColumnsPerRow: number[] = []; // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  tradeColumnHeader: string[] = []; // ['asset_pair', 'asset_pair_value', 'bought_date', 'bought_qty', 'bought_value', 'bought_fee', 'sold_date', 'sold_qty', 'sold_value', 'sold_fee'];
  tradeColumnValues: string[] = []; // ['ada/usd', '1.00', '05-30-2022', '832', '832.0832', '0.0832', '05-31-2022', '832', '862.32', '0.0832', '30.32'];
  @Input() showDataTable: boolean = false;

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  ngAfterContentChecked(): void {
    this.tradeColumnHeader= this.fileService.getHeaderFields();
    // need to add extra column for checkbox
    this.tradeColumnHeader.unshift("");
    console.log(this.tradeColumnHeader);
    this.tradeColumnValues = this.fileService.getFileData().slice(1, 50);
  }

  toggleEditModal(index: number) {
    this.showModal = !this.showModal;
  }

}
