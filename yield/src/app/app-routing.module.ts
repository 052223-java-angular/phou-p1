import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketsComponent } from './pages/markets/markets.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { TradesComponent } from './pages/trades/trades.component';

const routes: Routes = [
  {path: '', redirectTo: 'markets', pathMatch: 'full'},
  {path: 'markets', component: MarketsComponent, 
    children: [
      {path: 'view', component: MarketsComponent},
      {path: 'research', component: MarketsComponent},
      {path: 'detail', component: MarketsComponent}
  ]},
  {path: 'trades', component: TradesComponent, 
    children: [
      {path: 'view', component: TradesComponent},
      {path: 'analysis', component: TradesComponent},
      {path: 'records', component: TradesComponent}
  ]},
  {path: 'portfolio', component: PortfolioComponent, 
    children: [
      {path: 'view', component: PortfolioComponent},
      {path: 'analysis', component: PortfolioComponent},
      {path: 'entries', component: PortfolioComponent}
    ]},
  {path: '**', component: MarketsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
