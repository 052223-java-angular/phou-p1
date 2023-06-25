export interface IApiTrade {
  id: string,
  reportDate: string,
  reportId: string,
  assetName: string,
  currencyPair: string,
  side: string,
  amount: string,
  fee: string,
  qty: string
}

export class ApiTradeRecord implements IApiTrade {
  constructor(
    public id: string,
    public reportDate: string,
    public reportId: string,
    public assetName: string,
    public currencyPair: string,
    public side: string,
    public amount: string,
    public fee: string,
    public qty: string
  ) {}
  
}

