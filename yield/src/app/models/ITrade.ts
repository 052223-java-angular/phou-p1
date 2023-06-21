export interface ITrade {
  asset: string,
  orderId: string,
  date: string,
  side: string,
  unitPrice: number,
  qty: number,
  amountPaid: number,
  fee: number,
  currencyPair: string,
  index?: number,
  userId?: string
}


export class LocalTrade implements ITrade {
  constructor(
    public asset: string = '',
    public orderId: string = '',
    public date: string = '',
    public side: string = '',
    public unitPrice: number = 0,
    public qty: number = 0,
    public amountPaid: number = 0,
    public fee: number = 0,
    public currencyPair: string = '',
    public index?: number,
    public userId?: string
  ) {}
  
}