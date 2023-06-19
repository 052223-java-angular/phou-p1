import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ITrade, Trade } from '../models/Trade';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {

  @Input() showModal: boolean = false;
  @Input() tradeRecord!: ITrade;
  @Output() showModalChange = new EventEmitter<boolean>();
  @Output() tradeRecordChange = new EventEmitter<Trade>();

  editForm!: FormGroup;

  asset!: FormControl;
  orderId!: FormControl;
  date!: FormControl;
  side!: FormControl;
  unitPrice!: FormControl;
  qty!: FormControl;
  amountPaid!: FormControl;
  fee!: FormControl;
  currencyPair!: FormControl;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.asset = new FormControl({value: this.tradeRecord.asset, disabled: true});
    this.orderId = new FormControl({value: this.tradeRecord.orderId, disabled: true});
    this.date = new FormControl(this.tradeRecord.date);
    this.side = new FormControl(this.tradeRecord.side);
    this.unitPrice = new FormControl(this.tradeRecord.unitPrice);
    this.qty = new FormControl(this.tradeRecord.qty);
    this.amountPaid = new FormControl(this.tradeRecord.amountPaid);
    this.fee = new FormControl(this.tradeRecord.fee);
    this.currencyPair = new FormControl(this.tradeRecord.currencyPair);

    this.editForm = this.formBuilder.group<any>({
      asset: this.asset,
      orderId: this.orderId,
      date: this.date,
      side: this.side,
      unitPrice: this.unitPrice,
      qty: this.qty,
      amountPaid: this.amountPaid,
      fee: this.fee,
      currencyPair: this.currencyPair
    })
  }

  cancelEdit() {
    console.log("Cancelling edit");
    this.showModal = false;
    this.showModalChange.emit(this.showModal);
  }

  updateTradeRecord() : void {
    console.log("updating record ... ");

    this.updateTradeRecordValues();
    this.showModal = false;
    this.showModalChange.emit(this.showModal);
    this.tradeRecordChange.emit(this.tradeRecord);
  }

  private updateTradeRecordValues() : void {
    console.log("Before: ");
    console.log(this.tradeRecord);
    this.tradeRecord.asset = this.editForm.get('asset')?.value;
    this.tradeRecord.orderId = this.editForm.get('orderId')?.value
    this.tradeRecord.date  = this.editForm.get('date')?.value
    this.tradeRecord.side = this.editForm.get('side')?.value
    this.tradeRecord.unitPrice = this.editForm.get('unitPrice')?.value
    this.tradeRecord.qty = this.editForm.get('qty')?.value
    this.tradeRecord.amountPaid = this.editForm.get('amountPaid')?.value
    this.tradeRecord.fee = this.editForm.get('fee')?.value
    this.tradeRecord.currencyPair = this.editForm.get('currencyPair')?.value
    console.log("After: ");
    console.log(this.tradeRecord);
  }


}
