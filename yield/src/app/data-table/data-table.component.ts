import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent {
  showModal: boolean = false;
  @Input() showDataTable: boolean = false;

  constructor() { }


  toggleEditModal() {
    this.showModal = !this.showModal;
  }

}
