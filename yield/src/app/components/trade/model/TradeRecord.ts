export interface ITradeRecord {
  [key: string]: any,
  recordId: number,
  asset: string,
  orderId: string,
  date: string,
  side: string,
  unitPrice: number,
  qty: number,
  amountPaid: number,
  fee: number,
  currencyPair: string,
  fieldOrder: number[],
  
}

export class TradeRecord implements ITradeRecord {
  recordId!: number;
  asset!: string;
  orderId!: string;
  date!: string;
  side!: string;
  unitPrice!: number;
  qty!: number;
  amountPaid!: number;
  fee!: number;
  currencyPair!: string;
  fieldOrder!: number[];
}



