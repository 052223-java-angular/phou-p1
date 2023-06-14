import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent {
  showModal: boolean = false;
  tableColumnsPerRow: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  tradeColumnOption: string[] = ['asset_pair', 'asset_pair_value', 'bought_date', 'bought_qty', 'bought_value', 'bought_fee', 'sold_date', 'sold_qty', 'sold_value', 'sold_fee'];
  tradeColumnValues: string[] = ['ada/usd', '1.00', '05-30-2022', '832', '832.0832', '0.0832', '05-31-2022', '832', '862.32', '0.0832', '30.32'];
  @Input() showDataTable: boolean = false;

  constructor() { }


  toggleEditModal(index: number) {
    this.showModal = !this.showModal;
  }

}
