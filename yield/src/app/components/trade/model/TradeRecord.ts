export interface ITradeRecord {
  asset: string,
  orderId: string,
  date: string,
  side: string,
  unitPrice: number,
  qty: number,
  amountPaid: number,
  fee: number,
  currencyPair: string,
  fieldOrder: number[]
}

export class TradeRecord implements ITradeRecord {
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



