import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from "@angular/cdk/drag-drop";

import { AppComponent } from './app.component';
import { NgChartsModule } from 'ng2-charts';
import { TopBarComponent } from './top-bar/top-bar.component';
import { AnalyticComponent } from './analytic/analytic.component';
import { PanelLeftComponent } from './analytic/panel-left/panel-left.component';
import { PanelRightComponent } from './analytic/panel-right/panel-right.component';
import { MarketResultComponent } from './market-result/market-result.component';
import { SharedModule } from './shared/shared.module';
import { MarketsComponent } from './views/markets/markets.component';
import { AssetCardComponent } from './components/crypto/asset-card/asset-card.component';
import { AssetTableComponent } from './components/crypto/asset-table/asset-table.component';
import { PortfolioComponent } from './views/portfolio/portfolio.component';
import { TradesComponent } from './views/trades/trades.component';
import { FileComponent } from './components/trade/file/file.component';
import { FieldOptionComponent } from './components/trade/field-option/field-option.component';
import { ColOptionPipe } from './components/trade/pipe/col-option.pipe';
import { RecordsTableComponent } from './components/trade/records-table/records-table.component';
import { FormatRecordsPipe } from './components/trade/pipe/format-records.pipe';
import { EditTradeComponent } from './components/trade/edit-trade/edit-trade.component';
import { ExtractRecordValuePipe } from './components/trade/pipe/extract-record-value.pipe';
import { NotfoundComponent } from './views/notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    AnalyticComponent,
    PanelLeftComponent,
    PanelRightComponent,
    MarketResultComponent,
    MarketsComponent,
    AssetCardComponent,
    AssetTableComponent,
    PortfolioComponent,
    TradesComponent,
    FileComponent,
    FieldOptionComponent,
    ColOptionPipe,
    RecordsTableComponent,
    FormatRecordsPipe,
    EditTradeComponent,
    ExtractRecordValuePipe,
    NotfoundComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    NgChartsModule, 
    HttpClientModule, 
    ReactiveFormsModule,
    SharedModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
