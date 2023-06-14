import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-market-result',
  templateUrl: './market-result.component.html',
  styleUrls: ['./market-result.component.css']
})
export class MarketResultComponent implements OnInit {
  @Input() showMarketCard: boolean = false;
  @Input() showProfitLossCard: boolean = false;
  @Input() showFrequencyCard: boolean = false;
  @Input() showTradeCard: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

}
