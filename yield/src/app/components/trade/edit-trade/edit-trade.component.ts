import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TradeRecord } from '../model/TradeRecord';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-trade',
  templateUrl: './edit-trade.component.html',
  styleUrls: ['./edit-trade.component.css']
})
export class EditTradeComponent implements OnInit {
  constructor(private fb: FormBuilder) { }

  @Output() raiseEditEvent: EventEmitter<boolean> = new EventEmitter();
  @Input() tradeRecord!: TradeRecord;
  editTradeRecordForm!: FormGroup;

  ngOnInit(): void {
    this.editTradeRecordForm = this.fb.group({
      asset: [{value: this.tradeRecord?.asset, disabled: true},  [Validators.required]],
      orderId: [{value: this.tradeRecord?.orderId, disabled: true},  [Validators.required]],
      date: [this.tradeRecord?.date, [Validators.required]],
      side: [this.tradeRecord?.side, [Validators.required, this.sideValidator]],
      unitPrice: [this.tradeRecord?.unitPrice, [Validators.required, this.numberValidator]],
      qty: [this.tradeRecord?.qty, [Validators.required, this.numberValidator]],
      amountPaid: [this.tradeRecord?.amountPaid, [Validators.required, this.numberValidator]],
      fee: [this.tradeRecord?.fee, [Validators.required, this.numberValidator]],
      currencyPair: [{value: this.tradeRecord?.currencyPair, disabled: true}, [Validators.required]]
    })
  }

  sideValidator(control: AbstractControl) : ValidationErrors | null {
    let value: string = control.value;
    value = value.toLowerCase();
    if (value == "buy" || value === "sell") {
      return null;
    } 
    return { invalidSide: true };
  }

  numberValidator(control: AbstractControl) : ValidationErrors | null {
    const value = parseFloat(control.value);
    if (Number.isNaN(value)) {
      return { invalidNumber: true }
    };
    return null;
  }

  cancelEdit() : void {
    this.raiseEditEvent.emit(false);
  }

  submitEditForm() : void {
    if (!this.editTradeRecordForm.invalid) {
      this.tradeRecord.asset = this.editTradeRecordForm.get("asset")?.value;
      this.tradeRecord.orderId = this.editTradeRecordForm.get("orderId")?.value;
      this.tradeRecord.date = this.editTradeRecordForm.get("date")?.value;
      this.tradeRecord.side = this.editTradeRecordForm.get("side")?.value;
      this.tradeRecord.unitPrice = this.editTradeRecordForm.get("unitPrice")?.value;
      this.tradeRecord.qty = this.editTradeRecordForm.get("qty")?.value;
      this.tradeRecord.amountPaid = this.editTradeRecordForm.get("amountPaid")?.value;
      this.tradeRecord.fee = this.editTradeRecordForm.get("fee")?.value;
      this.tradeRecord.currencyPair = this.editTradeRecordForm.get("currencyPair")?.value;
  
      this.raiseEditEvent.emit(false);
    }
  }

}
