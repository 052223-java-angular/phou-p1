import { Component, Input, OnInit, AfterContentChecked } from '@angular/core';
import { FileService } from '../services/file.service';
import { ITrade } from '../models/Trade';
import { Header, IHeader } from '../models/Header';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, AfterContentChecked {

  // for showing edit modal
  showModal: boolean = false;

  // for showing trade records
  tradeRecords: ITrade[] = [];
  headerRow: IHeader[] = [];

  // for showing table
  @Input() showDataTable: boolean = false;

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  ngAfterContentChecked(): void {
    this.headerRow = this.fileService.getTradeHeaderFields();
    this.tradeRecords = this.fileService.getTradeRecords().slice(1,20);
    // need to add extra column for checkbox
    // this.headerRow.unshift(new Header("", 0));
  }

  toggleEditModal(index: number) {
    this.showModal = !this.showModal;
  }

}
