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
import { DataTableComponent } from './data-table/data-table.component';
import { MarketResultComponent } from './market-result/market-result.component';
import { SharedModule } from './shared/shared.module';
import { DataSelectTableComponent } from './data-select-table/data-select-table.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { MarketsComponent } from './pages/markets/markets.component';
import { TradeComponent } from './pages/trade/trade.component';
import { AssetCardComponent } from './components/crypto/asset-card/asset-card.component';
import { AssetTableComponent } from './components/crypto/asset-table/asset-table.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { TradesComponent } from './pages/trades/trades.component';
import { FileComponent } from './components/trade/file/file.component';
import { FieldOptionComponent } from './components/trade/field-option/field-option.component';
import { ColOptionPipe } from './components/trade/pipe/col-option.pipe';
import { RecordsTableComponent } from './components/trade/records-table/records-table.component';
import { FormatRecordsPipe } from './components/trade/pipe/format-records.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    AnalyticComponent,
    PanelLeftComponent,
    PanelRightComponent,
    DataTableComponent,
    MarketResultComponent,
    DataSelectTableComponent,
    FileUploadComponent,
    EditModalComponent,
    MarketsComponent,
    TradeComponent,
    AssetCardComponent,
    AssetTableComponent,
    PortfolioComponent,
    TradesComponent,
    FileComponent,
    FieldOptionComponent,
    ColOptionPipe,
    RecordsTableComponent,
    FormatRecordsPipe
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
