import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgChartsModule } from 'ng2-charts';
import { TopBarComponent } from './top-bar/top-bar.component';
import { AnalyticComponent } from './analytic/analytic.component';
import { PanelLeftComponent } from './analytic/panel-left/panel-left.component';
import { PanelRightComponent } from './analytic/panel-right/panel-right.component';
import { DataTableComponent } from './data-table/data-table.component';

@NgModule({
  declarations: [AppComponent, TopBarComponent, AnalyticComponent, PanelLeftComponent, PanelRightComponent, DataTableComponent],
  imports: [BrowserModule, AppRoutingModule, NgChartsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
