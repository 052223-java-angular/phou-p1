import { Injectable } from '@angular/core';
import { TradeRecordService } from './trade-record.service';
import { HttpClient } from '@angular/common/http';
import { ITrade } from '../models/ITrade';

type TradeSide = {
  date: string,
  side: string,
  unitPrice: number,
  qty: number,
  amountPaid: number,
  fee: number,
  currencyPair: string
}

class ProfitLoss {
  constructor(
    public buyDate?: string,
    public buyAmount?: number,
    public buyQty?: number,
    public buyFee?: number,
    public lastSellDate?: string,
    public sellAmount?: number,
    public sellQty?: number,
    public sellFee?: number,
    public pl?: number
   ) {}
}

@Injectable({
  providedIn: 'root'
})
export class TradeReportService {
  localBuyTrades: ITrade[] = [];
  localSellTrades: ITrade[] = [];
  localProfitLoss: ProfitLoss[] = [];


  constructor(
    private tradeRecordService: TradeRecordService,
    private httpClient: HttpClient
  ) { }

  initLocalTradesSides() {
    this.tradeRecordService.getLocalTradeRecords().forEach(record => {
      if (record.side === 'buy') {
        this.localBuyTrades.push(record)
      } else {
        this.localSellTrades.push(record);
      }
    });
    // console.log(this.localBuyTrades)
    // console.log(this.localSellTrades)
  }

  initProfitAndLoss() {
    const plRecords: ProfitLoss[] = [];
    let lastPostiveDebitAmount = 0;
    let lastPositiveDebitSellIndex = 0;
    let originDate = undefined;
    let lastDate = undefined;

    let runningPL = 0;
    let runningBuyQty = 0;
    let runningBuyAmount = 0;

    START: for (const buy of this.localBuyTrades) {
      runningBuyQty += buy.qty;
      runningBuyAmount += buy.amountPaid;
      if (originDate === undefined) {
        originDate = buy.date;
      }

      for (let i = lastPositiveDebitSellIndex; i < this.localSellTrades.length; i++) {
        const sell = this.localSellTrades[i];

        // when running buy qty > then sell, continue with calculation
        if (runningBuyQty >= sell.qty) {
          // can sell, so calc remaining qty after sell
          const remainingQty = runningBuyQty - sell.qty;

          // calculate pl for this trade
          const plRecord = new ProfitLoss();
          const pl = runningBuyAmount - sell.amountPaid;
          runningPL += pl;
          plRecord.buyAmount = sell.amountPaid;

          plRecord.buyDate = originDate;
          plRecord.lastSellDate = sell.date;

          plRecord.buyQty = sell.qty;
          plRecord.sellQty = sell.qty;

          plRecord.pl = pl;
          plRecords.push(plRecord);
          
          // reset variables
          originDate = undefined;
          lastDate = sell.date;
          lastPositiveDebitSellIndex = i;

        }

        // when running buy qty < then sell qty, return to start to add more qty
          // do not increment sell trade index, no calculation ran

      }
    }
    console.log(plRecords);

  }



  // generate profit and loss 
    // usd pair
    // other major pairs 
    // profitability over time comparison by major pairs
  // get hisorical price of major pairs
    // historical price movement between pairs
  // run frequency reports
    // most traded, least traded, least and more profitable
    // most profitable months
  // run reports by date or date range, 7, 14, 28, 60, 90, 120, 180, 360



}
