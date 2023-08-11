import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketsComponent } from './pages/markets/markets.component';
import { TradeComponent } from './pages/trade/trade.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';

const routes: Routes = [
  {path: 'markets', component: MarketsComponent, 
    children: [
      {path: 'view', component: MarketsComponent},
      {path: 'research', component: MarketsComponent},
      {path: 'detail', component: MarketsComponent}
  ]},
  {path: 'trades', component: TradeComponent, 
    children: [
      {path: 'view', component: TradeComponent},
      {path: 'analysis', component: TradeComponent},
      {path: 'records', component: TradeComponent}
  ]},
  {path: 'portfolio', component: PortfolioComponent, 
    children: [
      {path: 'view', component: PortfolioComponent},
      {path: 'analysis', component: PortfolioComponent},
      {path: 'entries', component: PortfolioComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
