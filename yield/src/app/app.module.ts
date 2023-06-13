import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgChartsModule } from 'ng2-charts';
import { TopBarComponent } from './top-bar/top-bar.component';
import { AnalyticComponent } from './analytic/analytic.component';
import { PanelLeftComponent } from './analytic/panel-left/panel-left.component';
import { PanelRightComponent } from './analytic/panel-right/panel-right.component';
import { DataTableComponent } from './data-table/data-table.component';
import { MarketResultComponent } from './market-result/market-result.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    AnalyticComponent,
    PanelLeftComponent,
    PanelRightComponent,
    DataTableComponent,
    MarketResultComponent,
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    NgChartsModule, 
    HttpClientModule, 
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
