export interface IApiTrade {
  id: string,
  reportDate: string,
  reportId: string,
  buyValue: string,
  sellValue: string,
  buyFee: string,
  sellFee: string,
  boughtQty: string,
  soldQty: string,
  buyDate: string,
  sellDate: string,
  pAndI: string,
  userId?: string,
  coinId?: string
}

export class ApiTradeRecord implements  IApiTrade {
  constructor(
    public id: string,
    public reportDate: string,
    public reportId: string,
    public buyValue: string,
    public sellValue: string,
    public buyFee: string,
    public sellFee: string,
    public boughtQty: string,
    public soldQty: string,
    public buyDate: string,
    public sellDate: string,
    public pAndI: string,
    public userId?: string,
    public coinId?: string
  ) {}
}