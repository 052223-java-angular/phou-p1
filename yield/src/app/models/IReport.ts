export interface IReport {
  id: string,
  reportDate: string,
  reportId: string,
  date: string,
  assetName: string,
  currencyPair: string,
  qty: string,
  costBasis: number,
  amount: number,
  fee: number,
  unitPrice: number,  
  profitLoss: number,
}


export class ProfitLossRecord implements IReport {
  constructor(
    public id: string,
    public date: string,
    public reportDate: string,
    public reportId: string,
    public assetName: string,
    public currencyPair: string,
    public qty: string,
    public costBasis: number,
    public amount: number,
    public fee: number,
    public unitPrice: number,
    public profitLoss: number
   ) {}
}