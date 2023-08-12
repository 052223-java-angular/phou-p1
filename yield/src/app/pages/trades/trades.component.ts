import { Component, Input, OnInit } from '@angular/core';
import { FileService } from 'src/app/components/trade/service/fileService';
import { TradeService } from 'src/app/components/trade/service/trade.service';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.css'],
  providers: [FileService, TradeService]
})
export class TradesComponent {

  fileChange: boolean = false;
  assignColumnChanged: boolean = false;


  setFileChange(value: boolean) : void {
    this.fileChange = value;
  }

  onColumnOrderChange(value: boolean) {
    this.assignColumnChanged = value;
  }

}
