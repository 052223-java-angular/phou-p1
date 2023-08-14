import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TradeService } from '../service/trade.service';

@Component({
  selector: 'app-field-option',
  templateUrl: './field-option.component.html',
  styleUrls: ['./field-option.component.css']
})
export class FieldOptionComponent implements OnInit {
  constructor(private tradeService: TradeService) { }

  ngOnInit(): void {
    this.tradeRecords$ = this.tradeService.tradeRecordRow;
    this.headerFields$ = this.tradeService.headerFields;
    this.colCount$ = this.tradeService.headerFieldColCount;
  }

  // default column options; requires copy of default options for pipe for drag and drop 
  defaultColOptions: string[] = ['asset','order_id','date','side','unit_price','qty','amount_paid','fee','currency_pair'];
  orderedColOptions: string[] = [...this.defaultColOptions];

  tradeRecords$!: Observable<string>;
  headerFields$!: Observable<string>;
  colCount$!: Observable<number>;

  displayAsRow: boolean = true;
  @Input() fileChange!: boolean;
  @Output() columnOrderChanged: EventEmitter<boolean> = new EventEmitter();


  onDrop(event: CdkDragDrop<string[]>) : void {
    moveItemInArray(this.orderedColOptions, event.previousIndex, event.currentIndex);
  }

  onColumnOrderChange() : void {
    this.tradeService.raiseFilteredHeaderFieldChange(this.orderedColOptions);
    this.columnOrderChanged.emit(true);
  }

}
