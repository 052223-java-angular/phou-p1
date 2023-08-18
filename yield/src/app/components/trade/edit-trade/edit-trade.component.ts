import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITradeRecord, TradeRecord } from '../model/TradeRecord';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { TradeService } from '../service/trade.service';

@Component({
  selector: 'app-edit-trade',
  templateUrl: './edit-trade.component.html',
  styleUrls: ['./edit-trade.component.css']
})
export class EditTradeComponent implements OnInit {
  constructor(private fb: FormBuilder) { }

  @Output() raiseEditEvent: EventEmitter<ITradeRecord> = new EventEmitter();
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
    this.raiseEditEvent.emit(this.tradeRecord);
  }

  submitEditForm() : void {
    if (!this.editTradeRecordForm.invalid) {
      const record = new TradeRecord();
      record.asset = this.editTradeRecordForm.get("asset")?.value;
      record.orderId = this.editTradeRecordForm.get("orderId")?.value;
      record.date = this.editTradeRecordForm.get("date")?.value;
      record.side = this.editTradeRecordForm.get("side")?.value;
      record.unitPrice = this.editTradeRecordForm.get("unitPrice")?.value;
      record.qty = this.editTradeRecordForm.get("qty")?.value;
      record.amountPaid = this.editTradeRecordForm.get("amountPaid")?.value;
      record.fee = this.editTradeRecordForm.get("fee")?.value;
      record.currencyPair = this.editTradeRecordForm.get("currencyPair")?.value;
      record.fieldOrder = this.tradeRecord.fieldOrder;
      record.recordId = this.tradeRecord.recordId;
      this.tradeRecord = record;
   
      this.raiseEditEvent.emit(record);
    }
  }

}
