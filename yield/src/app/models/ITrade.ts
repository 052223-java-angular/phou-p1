export interface ITrade {
  assetName: string,
  orderId: string,
  date: string,
  side: string,
  unitPrice: number,
  qty: number,
  amount: number,
  fee: number,
  currencyPair: string,
  index?: number,
  userId?: string
}


export class LocalTrade implements ITrade {
  constructor(
    public assetName: string = '',
    public orderId: string = '',
    public date: string = '',
    public side: string = '',
    public unitPrice: number = 0,
    public qty: number = 0,
    public amount: number = 0,
    public fee: number = 0,
    public currencyPair: string = '',
    public index?: number,
    public userId?: string
  ) {}
  
}