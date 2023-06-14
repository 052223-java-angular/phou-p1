import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-select-table',
  templateUrl: './data-select-table.component.html',
  styleUrls: ['./data-select-table.component.css']
})
export class DataSelectTableComponent implements OnInit {
  @Input() showSelectDataTable: boolean = true;
  tableColumnsPerRow: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  tradeColumnOption: string[] = ['asset_pair', 'asset_pair_value', 'bought_date', 'bought_qty', 'bought_value', 'bought_fee', 'sold_date', 'sold_qty', 'sold_value', 'sold_fee'];
  tradeColumnValues: string[] = ['ada/usd', '1.00', '05-30-2022', '832', '832.0832', '0.0832', '05-31-2022', '832', '862.32', '0.0832'];

  constructor() { }

  ngOnInit(): void {
  }

}
